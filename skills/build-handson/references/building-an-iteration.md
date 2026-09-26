# Building an Iteration

Builds one Iteration of the course: an exercise package the learner works in, and a solution package that is the completed exercise with model answers.
Read `COURSE.md` first. It defines the layout, package names, commands, the language of the material and the known pitfalls. The paths below use the default layout.

## Where the specification comes from

- What to build comes only from the "Iteration N" section of `docs/ROADMAP.md`. To add a feature that the roadmap lacks, update the roadmap with the user first.
- The previous Iteration's solution package (code, tests, design documents) is the foundation, carried over as is. Copy the whole directory rather than retyping it.
- Prose (README, exercise steps, walkthrough, test list) is written fresh for each Iteration. Copying and editing the previous Iteration's prose lets its topics leak into the new one.

## Design principles of the material

1. **The exercise starts from the previous solution.** The code, tests and design documents of Iteration N's exercise (N ≥ 1) are identical to Iteration N-1's solution, apart from the package name. Creating modules, registering them with the build tool, adding tests and updating the design documents are all the learner's work.
   - Iteration 0 is the only exception. Its exercise has the shape recorded in `COURSE.md`: typically stubs of the first modules that compile but fail at runtime, test directories with only the test runner's entry point, and design-document files with headings and a comment describing what to draw.
2. **The learner writes the test list.** The exercise steps give only the requirements, usage examples and the signatures of what to build, never the test cases. The learner writes unit and integration tests in `TESTLIST.md` and turns them Red → Green one item at a time. The solution's `TESTLIST.md` is the model answer, with every item checked.
   - The exercise's `TESTLIST.md` is a template with only the headings for unit and integration tests.
   - At the test-list stage, the steps have the learner find existing tests whose expected values change, and list them as "change … to …" items.
3. **Run the loop: test list → design → implementation → design review.** After the test list, the learner updates the design documents with the types, functions and modules that realize the behavior, implements them, then compares the documents with the implementation and fixes any mismatch.
   - The exercise's design step gives hints about which document and which part to think about, never the answer.
   - The solution's design documents are the model answer, and the walkthrough explains what changed since the previous Iteration and why.
   - The solution's design documents match the implementation. See [design-documents.md](design-documents.md).
4. **The learner performs the tool operations.** The exercise steps give the learner the tool tasks listed in the roadmap: registering the package, running the build tool's commands, and editing the build file. Show a command form in full in the Iteration where it first appears. After that, state only what to do ("run only the unit tests") and let the learner compose the command.
5. **Separate unit tests and integration tests.** Unit tests check the functions of one module in isolation. Integration tests call the program's entry point and check the modules working together.
6. **Tests belong to features.** Each module has one test file that lives as long as the module does. An Iteration that changes a feature adds tests to that file or rewrites its expected values. Test files are never named after Iterations.
7. **Build nothing ahead of time.** Signatures, module structure and comments contain only what this Iteration needs. Arguments and types for later use wait for the Iteration that uses them.
8. **Explain before use.** Syntax and concepts are explained in the notes of the Iteration that first uses them. The solution uses nothing that has not been explained by then.
9. **Write affirmatively.** State what the Iteration builds and teaches. Sentences that excuse the construction of the material ("… is not used", "does not depend on …") are rewritten as statements of what is used. Later Iterations are referred to positively: "Iteration N will …".
10. **The walkthrough mirrors the exercise.** The walkthrough's headings use the same numbers and names as the exercise steps. In the implementation step, it shows, for each item of the model test list, the test and the code at that point, including fake-it forms.

## Package contents

```text
README.md             What this Iteration builds, how to proceed, directory layout
TESTLIST.md           Test list (template in the exercise, model answer in the solution)
design/               Design documents (the previous solution's in the exercise, the model answer in the solution)
docs/iteration-N.md   Exercise: exercise steps / Solution: walkthrough of each step
<build file>          Named after the package
<source directories>  As defined in COURSE.md
<test directories>    Unit tests and integration tests in separate suites
```

The exercise's `docs/iteration-N.md` follows this outline. Write the headings in the language of the material.

1. **N-1 Setup**: register and build the package, and confirm that all carried-over tests pass. Run the current program.
2. **N-2 Syntax and concepts**: read the Iteration's notes and solve small tasks in the REPL.
3. **N-3 Test list**: present the requirements, usage examples and what to build (modules and signatures), and have the learner write `TESTLIST.md`. Also have them consider the impact on existing tests and which tests are unit and which are integration.
4. **N-4 Design documents**: give hints about which documents and parts to update. After updating, have the learner run the diagram check. In Iteration 0 this step writes the documents for the first time and starts with `docs/design.md`.
5. **N-5 Test-first implementation**: turn each test-list item Red → Green one at a time. Give per-feature hints (functions to use, common mistakes) and the tool tasks, but not the test cases.
6. **N-6 Reflection**: questions that compare the learner's `TESTLIST.md` with the solution's, and questions about the roles of unit and integration tests. The last question is "compare the design documents with the implementation, and fix the documents where they differ".
7. **N-7 Advanced exercise**: a slightly further feature the learner builds alone. End by stating that it follows the same order: test list, design documents, implementation.

## Steps

1. Read the Iteration N and N-1 sections of `docs/ROADMAP.md`. Read the code, tests and design documents of Iteration N-1's solution and its notes, to learn the state carried over and which topics are already explained.
2. Copy Iteration N-1's solution directory to both `iterations/iteration-N/solution` and `iterations/iteration-N/exercise`. Remove build output and the previous `docs/iteration-(N-1).md`, and rename the packages following the naming in `COURSE.md`. Leave the exercise's design documents as they are.
3. In the exercise, reset `TESTLIST.md` to the template, and write `README.md` and `docs/iteration-N.md` fresh following the outline above. Leave the code, tests and design documents untouched.
4. Write the solution's model-answer `TESTLIST.md`.
5. Update the solution's design documents according to the roadmap's design-document updates, following `docs/design.md`.
6. In the solution, implement the roadmap's features and refactorings test-first, in the order of the test list. Write each test and see it fail before implementing. Keep the intermediate code for the walkthrough.
7. Compare the solution's design documents with the implementation and fix them to match. Record decisions made while implementing (helper functions, instances, data structures) in the answers of the walkthrough's reflection step.
8. Write the solution's `README.md` and `docs/iteration-N.md`. In the walkthrough of the design step, list the changes from the previous Iteration document by document, with the reasons.
9. Write the notes for this Iteration's new syntax and concepts, and update the notes' table of contents. Base the explanations on the actual signatures and behavior, and include examples that can be tried in the REPL.
10. Register the solution with the build tool as `COURSE.md` specifies.
11. Verify.
    - The verification command in `COURSE.md` passes, including diagram checks.
    - All solution tests pass.
    - The exercise builds, and all carried-over tests pass.
    - The exercise's code, tests and design documents are identical to Iteration N-1's solution. Check with `diff -r`, excluding the build file, `README.md`, `TESTLIST.md`, `docs/` and build output.
    - The solution's design documents match the implementation, including the design-to-code check script if the repository has one.
    - Running the solution reproduces the roadmap's usage examples.
    - If later Iterations already exist, Iteration N+1's exercise still matches Iteration N's solution. Otherwise, fix the exercises from N+1 onward, and their solutions if affected.
12. Polish all prose written for this Iteration with the `finalize-artifacts` skill: both packages' `README.md`, `TESTLIST.md` and `docs/iteration-N.md`, the solution's design documents, code comments and the notes. Look especially for excuse-like sentences that break principle 9.

## Adding an Iteration

To add an Iteration at the end of the course, first add its section and its row in the overview table to `docs/ROADMAP.md` with the user, and update the list of Iterations in the root `README.md`. Then build it with the steps above.

## Output shown in the material

Copy every REPL result, compiler message, test failure and program output from a real run.

- Get REPL output by writing the input to a file and feeding it to the REPL on standard input, with the REPL's quiet option if it has one.
- Write long output to a file and read the file. Piping a REPL into `head` can leave the REPL running after the pipe closes.
- To capture the output of a broken implementation, copy the package into the scratchpad and break the copy. Keep the files in the repository intact.
- Record any tool or language trap met while building in the "Pitfalls" section of `COURSE.md`, so that later Iterations avoid it.
