# Design documents

In every Iteration the learner updates the design documents before implementing and reviews them afterwards.
Which documents to write is decided with the user during course planning. This file lists the options to propose, how to set them up, and how to keep the model answers true to the code.

## Choosing the documents

Propose a small set, usually two to four documents, that together show the structure at more than one level of detail.
Every document in the set changes in most Iterations. A document that would stay the same for the whole course teaches little.

| Document | Shows | Fits | Grows by |
| --- | --- | --- | --- |
| C4 model (Context, Container, Component, Code) | The system at four zoom levels, from its users down to its modules and code | Any program; a good default when unsure | Adding containers (files, databases, services), modules, and code-level diagrams |
| Module dependency diagram | Modules and which one uses which | Programs split into several modules or packages | Adding modules and dependency arrows |
| UML class diagram | Classes or types, their fields, and relations | Object-oriented designs; data types in any language | Adding types, fields and relations |
| UML sequence diagram | The order of calls and side effects in one scenario | Programs with I/O, services, or several collaborating parts | Adding scenarios and branches |
| UML state diagram | States and transitions | Games, protocols, workflows, UI | Adding states and events |
| ER diagram | Stored entities and their relations | Programs with a database or persistent files | Adding entities and columns |
| Data flow diagram | How data moves between processes and stores | Pipelines, batch processing, reporting | Adding processes and stores |
| Type and function flow | Types as nodes and functions as arrows, from input to output | Functional programming | Adding types, transformations and error branches |
| Architecture Decision Records | One record per significant design decision, with its reasons | Courses that teach design judgment | One record per Iteration with a real decision |
| API specification (such as OpenAPI) | Endpoints, requests and responses | Web APIs | Adding endpoints and fields |

Typical combinations:

- A command-line program in a functional language: C4 model with Component showing modules and the boundary between pure code and I/O, and Code showing the type and function flow, the data types, and the order of I/O.
- An object-oriented application: C4 Context and Container, a class diagram, and sequence diagrams for the main scenarios.
- A web API with a database: C4 Container, an API specification, an ER diagram, and sequence diagrams.

## Notation

Recommend notations that are plain text, render in the editor or on the hosting service, and show meaningful diffs between Iterations:

- Mermaid inside Markdown for diagrams (it supports C4, flowcharts, class, sequence, state and ER diagrams).
- Markdown for records and descriptions.
- YAML or JSON for API specifications.

Agree on one file per document (or per level, for the C4 model), under `design/` in every package.

## The learner's guide

Write `docs/design.md` during course planning. It explains:

- The loop: test list → design documents → implementation → design review, and how the test list (behavior) differs from the design documents (structure).
- Each document: what it shows, its file, and which parts of the program it describes.
- The notation, with one complete example per document. Use a small program unrelated to the course subject, so the guide gives no answers away.
- The rules:
  - Names in the documents match the names in the code.
  - Each diagram shows one viewpoint.
  - One or two sentences above a diagram say what it shows.
  - Rules the diagram cannot express go in a list below it.
  - The documents show only the current state of the program.
- How to preview the diagrams and how to run the syntax check.

## In the exercise and the solution

- Iteration 0's exercise contains every design-document file with its headings and a comment describing what to draw there. The learner writes the first version.
- From Iteration 1 on, the exercise contains the previous solution's documents unchanged. The design step gives hints only: which document, which part, which kinds of element to add.
- The solution contains the model answer for the state at the end of the Iteration. Its walkthrough lists the changes document by document and gives the reason for each decision.

## Keeping the model answers true to the code

The solution's design documents must match its implementation.

- Names of modules, types and functions in the documents are the names in the code.
- Dependencies drawn in the documents are the dependencies in the code, in both directions: nothing missing, nothing extra.
- Details too small for a diagram, such as local helper names, go in the description below it.

If the notation can be compared with the code mechanically, write a check script in the course repository during setup and add it to the verification command. For example, a script can read the arrows of a Mermaid component diagram and compare them with the import statements of the modules, reporting arrows that exist only in the diagram or only in the code. Exclude elements outside the program (external libraries, files) from the comparison.

Also add a syntax check for every diagram (for example by parsing each Mermaid block) to the linters, so that a broken diagram fails the verification.
