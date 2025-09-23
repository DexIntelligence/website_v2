---
title: "Axiomatic Antitrust: From ‘Probably’ to Provably Correct Economic Evidence"
author: "Gemini"
date: "2025-09-23"
tags: [Antitrust, Legal Tech, Formal Methods, Economics, AI]
---

# Axiomatic Antitrust: From ‘Probably’ to Provably Correct Economic Evidence

In court, the cross-examination begins: “Your economic model seems to show a problem, but how can we be sure? What are its hidden assumptions?”

Imagine, instead of defending a complex spreadsheet, your expert presents a formal proof. They bring up a log file that reads like a geometric derivation: “**Hypothesis:** Post-merger HHI is 2,150. **Axiom:** Guideline 1 defines ‘highly concentrated’ as HHI ≥ 1,800. **Lemma 1:** The market is therefore highly concentrated. **Theorem:** The structural presumption is triggered.”

This is the future of economic evidence: moving from the statistical and probabilistic to the logical and provable. By borrowing the tools of formal mathematics, we can construct **axiomatic economic arguments**—arguments that are clearer, safer, and demonstrably sound. This isn’t science fiction; proof assistants like **Lean** are already used to verify theorems at the pinnacle of mathematics. Now, that same deductive rigor can be applied to the law.

***

## From Economic Models to Mathematical Proofs

The core idea is to treat legal-economic analysis like a system of Euclidean geometry. Just as Euclid built all of geometry from a handful of axioms and postulates, we can construct a defensible antitrust argument from a base of formalized rules.

Here’s how the translation works:

* **Axioms:** The foundational legal standards and economic principles. A rule like the HHI threshold from the [2023 U.S. Merger Guidelines](https://www.justice.gov/atr/2023-merger-guidelines) is not just a guideline; it’s a formal axiom in our system.
* **Theorem:** The ultimate conclusion you want to prove (e.g., “The merger creates a prima facie risk of a substantial lessening of competition”).
* **Proof:** The step-by-step, machine-checked logical derivation that connects the facts of your case to the theorem, using only the established axioms.

The system doesn't *predict* an answer; it **proves a theorem** based on the axioms you provide.



***

## Proving a Theorem: A Merger Review Example

Let’s prove a simple theorem regarding the structural presumption in a merger review. The system uses a library of definitions (our axioms) to construct a proof.

The code below is not just a calculation; it’s the formal statement of a theorem and its proof:

```lean
-- Axioms: Formal definitions from economics
def market_share (firm_sales total_sales : Real) := firm_sales / total_sales
def HHI (shares : List Real) := (shares.map (fun s => (100 * s)^2)).sum

-- The theorem we want to prove
theorem structural_presumption_triggered
  -- Hypotheses (the facts of our case)
  (shares_pre shares_post : List Real)
  (h_pre  : HHI shares_pre  < 1800)
  (h_post : HHI shares_post ≥ 1800)
  (delta  : HHI shares_post - HHI shares_pre ≥ 100) :

  -- The conclusion to be proven
  RiskOfSLC_Under_Guideline1 := by
  -- The Proof: Apply the axiom from the 2023 Guidelines §2.1
  exact guideline1_presumption h_post delta