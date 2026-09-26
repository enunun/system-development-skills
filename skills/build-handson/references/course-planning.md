# Course planning

Course planning turns the user's intent into two files that every later Iteration is built from:

- `COURSE.md`: the course plan for the people and agents who build the material. It holds the decisions and conventions.
- `docs/ROADMAP.md`: the learner-facing list of Iterations. It holds what each Iteration builds and teaches.

Do the steps below in order. Ask with the AskUserQuestion tool, one topic at a time, and put your recommended option first. Where an answer is open-ended (prior knowledge, learning goals), offer typical options and let the user answer freely through "Other".

## 1. Audience and learning goals

Settle these before anything else, because every later choice depends on them:

- The learners' prior knowledge: programming experience, languages they already know, familiarity with testing and design.
- What they should be able to do after the course.
- The language or technology to learn, and its version if it matters.
- The language the material is written in.
- The size of the course: the number of Iterations and the expected time per Iteration.

## 2. Subject

The subject is the program the learner grows through all Iterations.
Propose two to four candidates that fit the audience and goals. For each candidate, show:

- What the finished program does, with an example session (commands and output, or requests and responses).
- Why it fits: which topics each stage of the program naturally introduces.
- How it grows: a rough sequence of features from the smallest working version to the finished one.

A good subject starts small enough that Iteration 0 is a few functions, and each feature it adds needs exactly the next topic to learn.
Discuss and adjust until the user picks one.

## 3. Design documents

Decide which design documents the learner writes, their notation, and how each one grows across Iterations.
Propose options from [design-documents.md](design-documents.md) that match the language, the paradigm and the subject, with a short example of what the first Iteration's documents would look like.

## 4. Development environment and tasks

Propose defaults for the following and let the user confirm or change them:

- Test framework, build tool, formatter and linters.
- Repository layout: where the exercise and solution packages of each Iteration live, how they are named, and how they are registered with the build tool.
- Commands to build, test, run and start a REPL, and the single command that verifies the whole repository (such as `mise run check`).
- How the material is checked: diagram syntax checks, and a design-to-code check script if the design notation allows one.
- Tool operations left to the learner (registering a package, adding a dependency, running a subset of tests), and in which Iteration each command form is first shown in full.
- Where the per-Iteration notes on new syntax and concepts live (for example `docs/<language>/iteration-N.md`).

The default layout is:

```text
COURSE.md                       Course plan (for builders)
README.md                       Course overview and the list of Iterations (for learners)
docs/ROADMAP.md                 Iterations: requirements, topics, design-document updates
docs/tdd.md                     Test-driven development and how to write test lists
docs/design.md                  How to write the design documents
docs/<language>/iteration-N.md  Notes on the syntax and concepts first used in Iteration N
iterations/iteration-N/
  exercise/                     Where the learner works
  solution/                     The completed exercise and the model answers
```

## 5. Roadmap

Draft `docs/ROADMAP.md` and show it to the user. It contains:

- The finished program's usage example.
- How every Iteration proceeds (the loop, and where the exercise and solution are).
- How tests are split: what unit tests and integration tests each check, and where they live.
- A table of Iterations with the features built and the topics learned.
- One section per Iteration with these items:
  - **Requirements**: behavior visible to the user of the program.
  - **Usage**: example commands and output.
  - **Modules**: modules and signatures to add or change.
  - **Refactoring**: when the Iteration restructures existing code without changing behavior.
  - **Design-document updates**: what changes in each design document.
  - **Topics**: syntax, concepts and tools learned.
  - **Impact on existing tests**: which expected values change.
  - **Learner's tool tasks**: build-tool operations the learner performs.

Check the draft against these rules before showing it:

- Each Iteration introduces its topics through a feature that needs them, not as isolated exercises.
- No Iteration uses a topic that an earlier Iteration has not introduced.
- Iteration 0 already runs the whole loop: a test list, the first version of every design document, and a working program.
- The last Iteration completes the usage example at the top.

Revise it until the user agrees. Write no Iteration material before that.

## 6. Recording the plan

Write `COURSE.md` with everything decided in steps 1 to 4:

- Audience, goals, language of the material, and course size.
- The subject and its final usage example.
- The design documents: files, notation, what each level shows, and how they evolve.
- The development environment: every item agreed in step 4.
- The shape of Iteration 0's exercise: which files start as stubs, and what the test directories and design documents contain.
- A "Pitfalls" section. Add to it whenever building an Iteration reveals a trap in the tools or language that later Iterations should avoid.

Save the agreed `docs/ROADMAP.md`.

## 7. Setting up the repository

Set up what the Iterations share, following `COURSE.md`:

- The build tool's workspace or project file, the formatter and linter configuration, and the verification command.
- Diagram syntax checks and the design-to-code check script, if the plan includes them.
- `README.md` for learners: what the course teaches and what it assumes. It also explains how to set up the environment and links to the roadmap and guides.
- `docs/tdd.md`: the Red → Green → Refactor cycle, how to write and order a test list, the split between unit and integration tests, and how to run the tests.
- `docs/design.md`: the design-document guide described in [design-documents.md](design-documents.md).

Run the verification command once to confirm that the empty repository passes. Then build Iteration 0 with [building-an-iteration.md](building-an-iteration.md).
