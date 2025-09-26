---
title: "From "Probably Right" to "Provably Right": What Lean-Style Proofs Mean for Competition Law"
date: "2025-09-26"
author: "Justin Mayne"
excerpt: "Competition lawyers know the question that always comes up: can this analysis hold up under scrutiny? Leading mathematicians have been asking themselves the same thing—and changing how they work in response."
readTime: "5 min read"
---

For centuries, math proofs were reviewed by hand. As proofs became longer and more complex, even experts worried about unnoticed mistakes. In 2023, when Fields Medal–winning mathematician **Terence Tao** proved the Polynomial Freiman-Ruzsa conjecture, he didn't stop at publishing the traditional paper. Within days, he launched a project to verify every logical step using software called **Lean**—a tool that catches errors computers can spot but humans might miss.

In Lean, each step of reasoning must follow inevitably from the previous one. If something doesn't follow, the program stops cold. No handwaving allowed.

This approach has already caught subtle but significant errors in published mathematics. Tao himself discovered a "small (but non-trivial) bug" in one of his papers only when Lean refused to compile. The mathematical community is taking notice: over 210,000 theorems have now been formalized in Lean's library, creating an unshakeable foundation of verified knowledge.

## The Stakes in Competition Economics

Economic analysis for merger review shares a similar challenge—but with immediate, real-world consequences. Consider what happens when two firms propose to merge in a market with five competitors. The competition authority must calculate whether the resulting concentration exceeds legal thresholds, often using the Herfindahl-Hirschman Index (HHI).

Under Canada's new 2024 amendments, if a merger increases HHI by more than 100 points and results in either a combined market share above 30% or a total HHI exceeding 1,800, it triggers a **presumption of anticompetitive harm**. The burden shifts to the merging parties to prove otherwise.

These aren't abstract numbers. A calculation error could mean blocking a beneficial merger—or allowing a harmful one. Yet the current process often relies on Excel spreadsheets passed between teams, market definitions that shift during review, and data sources that opposing parties dispute.

## A Concrete Example: When Every Step Matters

Imagine a proposed merger in the Ontario grocery market. The parties claim five major chains compete regionally. The Competition Bureau argues for narrower local markets. Here's what typically unfolds:

**Step 1: Market Definition**  
Each side presents different geographic boundaries. The merging parties include discount chains; the Bureau excludes them. Already, we have two different analyses.

**Step 2: Share Calculation**  
Using scanner data, the parties calculate a 28% combined share. But wait—should online sales be included? What about private label products? Small adjustments push the share above or below the critical 30% threshold.

**Step 3: HHI Computation**  
The Bureau calculates a post-merger HHI of 1,850 with an increase of 120 points—triggering the presumption. The parties, using their market definition, get 1,750 with an increase of 95 points—safely below.

**Step 4: The Black Box Problem**  
Neither side can fully verify the other's calculations. Data sources differ. Formulas hide in protected cells. Assumptions remain implicit. The Tribunal must somehow determine which analysis to trust.

This is where the mathematical world's solution becomes relevant.

## Making Analysis "Lean-Compatible"

What if merger analysis followed principles similar to Lean verification? Not the software itself, but the mindset:

**1. Explicit Assumptions**  
Every market definition choice becomes a stated assumption that others can challenge directly. "We include Store X because it's within 10km" becomes a testable proposition.

**2. Traceable Calculations**  
HHI calculations live in open, documented code rather than black-box spreadsheets. Each step from raw data to final number is visible and verifiable.

**3. Reproducible Results**  
Any economist given the same data and assumptions should reach identical conclusions. No more "I get a different number when I run it."

**4. Version Control**  
Changes to the analysis are tracked. When the Bureau adjusts market boundaries mid-review, everyone can see exactly what changed and why it matters.

Some agencies are already moving this direction. The U.S. Department of Justice increasingly requires merging parties to submit their economic analyses as documented code. Academic journals now demand "replication packages" before publishing empirical papers. The tools exist—they just haven't reached standard practice in competition law.

## Beyond Compliance: Strategic Advantages

Forward-thinking firms are discovering that transparent, verifiable analysis isn't just about satisfying regulators—it's strategically powerful:

- **Credibility**: Analyses that can be independently verified carry more weight with tribunals and courts.
- **Efficiency**: Documented, modular code can be reused and adapted for future matters.
- **Collaboration**: When multiple experts can verify each other's work, the best arguments surface faster.
- **Defense**: If your analysis is genuinely reproducible, opposing experts who claim different results must explain their deviations.

As one antitrust economist recently noted: "The side with the cleaner code often wins, simply because judges trust what they can verify."

## Looking Ahead

Canada's structural presumptions make transparent analysis more critical than ever. When crossing a numerical threshold flips the burden of proof, every calculation step matters. The difference between an HHI of 1,799 and 1,801 could determine whether a merger proceeds.

Meanwhile, the mathematical community continues pushing boundaries. Tao's latest project aims to formalize the proof of the prime number theorem—a cornerstone of mathematics—ensuring every step is computer-verified. Similar collaborative efforts have resolved decades-old conjectures by combining human insight with machine verification.

Competition economics doesn't need to implement Lean itself. But it can adopt the principle: make reasoning explicit, verifiable, and reproducible. In a world where market concentration metrics carry legal weight, we can't afford to guess whether our calculations are correct.

Mathematicians like Terence Tao are showing that even the most complex reasoning can be verified step by step. Competition law economics can embrace the same spirit—transforming our analyses from "probably right" to "provably right."
