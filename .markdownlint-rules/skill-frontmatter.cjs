// SKILL.mdのfrontmatterと長さを，Agent Skillsの制約に照らして検査する．
const path = require("node:path");
const { parse } = require("yaml");

const NAME_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const NAME_MAX = 64;
const RESERVED_WORDS = ["anthropic", "claude"];
const DESCRIPTION_MAX = 1024;
const BODY_MAX_LINES = 500;

module.exports = {
  names: ["skill-frontmatter"],
  description: "SKILL.md frontmatter and length follow the Agent Skills constraints",
  tags: ["skill"],
  parser: "none",
  function: (params, onError) => {
    if (path.basename(params.name) !== "SKILL.md") {
      return;
    }
    const report = (detail) => onError({ lineNumber: 1, detail });

    const yamlText = params.frontMatterLines
      .filter((line) => line.trim() !== "---")
      .join("\n");
    if (yamlText.trim() === "") {
      report("SKILL.md must start with YAML frontmatter containing name and description.");
      return;
    }
    let frontMatter;
    try {
      frontMatter = parse(yamlText) ?? {};
    } catch (error) {
      report(`Frontmatter is not valid YAML: ${error.message}`);
      return;
    }

    const { name, description } = frontMatter;
    const dirName = path.basename(path.dirname(params.name));
    if (typeof name !== "string" || name === "") {
      report("Frontmatter must have a non-empty name.");
    } else {
      if (!NAME_PATTERN.test(name)) {
        report(`name "${name}" must use only lowercase letters, digits, and single hyphens.`);
      }
      if (name.length > NAME_MAX) {
        report(`name is ${name.length} characters; the limit is ${NAME_MAX}.`);
      }
      const reserved = RESERVED_WORDS.find((word) => name.toLowerCase().includes(word));
      if (reserved) {
        report(`name must not contain the reserved word "${reserved}".`);
      }
      if (name !== dirName) {
        report(`name "${name}" must match the directory name "${dirName}".`);
      }
    }

    if (typeof description !== "string" || description.trim() === "") {
      report("Frontmatter must have a non-empty description.");
    } else {
      if (description.length > DESCRIPTION_MAX) {
        report(`description is ${description.length} characters; the limit is ${DESCRIPTION_MAX}.`);
      }
      if (/<\/?[A-Za-z][^>]*>/.test(description)) {
        report("description must not contain XML tags.");
      }
    }

    if (params.lines.length > BODY_MAX_LINES) {
      report(`Body is ${params.lines.length} lines; keep SKILL.md under ${BODY_MAX_LINES} lines and move details to references/.`);
    }
  },
};
