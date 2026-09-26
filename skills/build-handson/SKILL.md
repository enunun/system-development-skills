---
name: build-handson
description: Builds a test-driven, iterative hands-on course in which learners grow one program over several Iterations. In every Iteration the learner writes a test list, design documents and code. The skill first interviews the user about the audience, learning goals, subject and design documents, and records the agreed course plan. It then builds one Iteration at a time as an exercise package and a solution package, verified by real builds and tests. Use when asked to create a hands-on course or tutorial, to design its roadmap, or to build, add or fix an Iteration (e.g. 「ハンズオンを作りたい」「教材を作って」「Iteration Nを作って」「次のIterationを追加して」「Iteration Nを直して」).
---

# build-handson

Builds a hands-on course in which the learner grows a single program over a sequence of Iterations.
Each Iteration adds one or two features and one coherent set of things to learn.
The learner goes through the same loop every time: **test list → design documents → test-first implementation → design review**.

The course is made of two kinds of work, handled in this order:

1. **Course planning** (once per course): interview the user, agree on the course plan, and set up the repository. See [references/course-planning.md](references/course-planning.md).
2. **Building an Iteration** (once per Iteration): build the exercise and solution packages of one Iteration from the plan. See [references/building-an-iteration.md](references/building-an-iteration.md).

## Deciding where to start

Look for `COURSE.md` at the root of the working repository.

- **No `COURSE.md`**: start with course planning. Write no course material before the user has agreed on the plan, even if the request is "build Iteration 0".
- **`COURSE.md` exists**: read it and `docs/ROADMAP.md`, then build the requested Iteration. If the request needs a feature, topic or design-document change that the plan does not cover, update `COURSE.md` or `docs/ROADMAP.md` with the user first.

Handle only one Iteration per run. If several are requested, finish them one at a time in ascending order.

## What is decided with the user, and what is fixed

Decided with the user during course planning, never assumed:

- **Who the learners are and what they learn**: prior experience, learning goals, the language or technology, and the language of the material.
- **The subject**: the program the learner grows. Propose candidates that fit the audience and goals, and settle it through discussion.
- **The design documents**: which documents to write, their notation, and how each one evolves across Iterations. See [references/design-documents.md](references/design-documents.md) for the options to propose.
- **The development environment**: test framework, build tool, directory layout, commands, and the tool operations left to the learner.

Fixed for every course:

1. **Test-driven.** Every feature in every solution is built Red → Green → Refactor from a test list. The learner writes the test list from the requirements instead of being given a specification.
2. **Iterative.** The program grows Iteration by Iteration. Each Iteration's exercise starts from the previous Iteration's solution, unchanged.
3. **Design documents in every Iteration.** Every Iteration updates the design documents before implementing and reviews them against the implementation afterwards. The solution's design documents are the model answer and match the implementation.

## Principles of the material

These apply to everything the skill writes. The Iteration-building reference expands on each.

- **Specifications live in the plan.** What an Iteration builds comes only from its section of `docs/ROADMAP.md`. Conventions such as layout, commands and tools come only from `COURSE.md`.
- **Build nothing ahead of time.** Code, types, modules and design documents contain only what is needed at that Iteration.
- **Explain before use.** New syntax, concepts and tools are explained in the notes of the Iteration that first uses them, before the solution uses them.
- **Write affirmatively.** Describe what is built and learned instead of excusing how the material is built ("… is not used here"). Refer to later Iterations positively ("Iteration N will …").
- **Show real output.** REPL results, compiler messages, test failures and program output in the material are copied from actual runs, never guessed.
- **Polish before reporting.** Finish all prose with the `finalize-artifacts` skill (`system-development-skills:finalize-artifacts` when this skill is loaded as a plugin).
