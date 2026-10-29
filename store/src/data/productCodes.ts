// Internal ELANORA product numbers. Used only for product tables / internal records —
// no page or component imports this file, so the numbers never reach the website.
//
//   EL-<type>-<shape>-<nnn>   e.g. EL-RG-OV-001
//   type:  RG ring · BR bracelet · NK necklace · ER earrings
//   shape: RD round · OV oval · EM emerald · PE pear · RA radiant · CU cushion · MQ marquise · PR princess · AS asscher · HT heart · XX none
//   nnn:   running number across the whole catalogue, in the order products were added.
//
// A number never changes once assigned (even if the product is renamed) and is never reused.
// When adding a product, give it the next number here.

export const productCodes: Record<string, string> = {
  "oval-three-stone-diamond-ring": "EL-RG-OV-001",
  "yellow-oval-halo-diamond-ring": "EL-RG-OV-002",
  "oval-solitaire-diamond-ring": "EL-RG-OV-003",
  "oval-pave-diamond-ring": "EL-RG-OV-004",
  "round-solitaire-diamond-ring": "EL-RG-RD-005",
  "round-split-pave-diamond-ring": "EL-RG-RD-006",
  "round-halo-diamond-ring": "EL-RG-RD-007",
  "round-pave-diamond-ring": "EL-RG-RD-008",
  "yellow-emerald-halo-diamond-ring": "EL-RG-EM-009",
  "emerald-solitaire-diamond-ring": "EL-RG-EM-010",
  "emerald-bezel-diamond-ring": "EL-RG-EM-011",
  "emerald-split-pave-diamond-ring": "EL-RG-EM-012",
  "yellow-pear-halo-diamond-ring": "EL-RG-PE-013",
  "pear-three-stone-diamond-ring": "EL-RG-PE-014",
  "pear-split-pave-diamond-ring": "EL-RG-PE-015",
  "pear-solitaire-diamond-ring": "EL-RG-PE-016",
  "round-diamond-tennis-bracelet": "EL-BR-RD-017",
  "pear-diamond-line-bracelet": "EL-BR-PE-018",
  "emerald-solitaire-diamond-necklace": "EL-NK-EM-019",
  "round-solitaire-diamond-necklace": "EL-NK-RD-020",
  "oval-solitaire-diamond-necklace": "EL-NK-OV-021",
  "pear-solitaire-diamond-necklace": "EL-NK-PE-022",
  "heart-solitaire-diamond-necklace": "EL-NK-HT-023",
  "pink-diamond-angel-wing-necklace": "EL-NK-PE-024",
  "yellow-diamond-angel-wing-necklace": "EL-NK-PE-025",
  // EL-NK-PE-026 (Blue Diamond Angel Wing Necklace) was removed 2026-10-25 — number retired, never reuse.
  "heart-diamond-tennis-bracelet": "EL-BR-HT-027",
  "marquise-diamond-ear-climber": "EL-ER-MQ-028",
  "pink-diamond-angel-wing-stud-earrings": "EL-ER-PE-029",
  "pink-diamond-angel-wing-drop-earrings": "EL-ER-PE-030",
  "yellow-diamond-angel-wing-stud-earrings": "EL-ER-PE-031",
  "yellow-diamond-angel-wing-drop-earrings": "EL-ER-PE-032",
  "emerald-halo-diamond-stud-earrings": "EL-ER-EM-033",
  "oval-halo-diamond-stud-earrings": "EL-ER-OV-034",
  "round-halo-diamond-stud-earrings": "EL-ER-RD-035",
  "pear-halo-diamond-stud-earrings": "EL-ER-PE-036",
  "heart-halo-diamond-stud-earrings": "EL-ER-HT-037",
  "yellow-pear-halo-diamond-stud-earrings": "EL-ER-PE-038",
  "yellow-heart-halo-diamond-stud-earrings": "EL-ER-HT-039",
  "emerald-halo-diamond-necklace": "EL-NK-EM-040",
  "oval-halo-diamond-necklace": "EL-NK-OV-041",
  "round-halo-diamond-necklace": "EL-NK-RD-042",
  "pear-halo-diamond-necklace": "EL-NK-PE-043",
  "heart-halo-diamond-necklace": "EL-NK-HT-044",
  "round-emerald-diamond-tennis-bracelet": "EL-BR-RD-045",
  "pink-heart-diamond-bracelet": "EL-BR-HT-046",
  "marquise-solitaire-diamond-ring": "EL-RG-MQ-047",
  "radiant-solitaire-diamond-ring": "EL-RG-RA-048",
  "cushion-solitaire-diamond-ring": "EL-RG-CU-049",
  "asscher-solitaire-diamond-ring": "EL-RG-AS-050",
  "princess-solitaire-diamond-ring": "EL-RG-PR-051",
  "heart-solitaire-diamond-ring": "EL-RG-HT-052",
  "pink-diamond-angel-wing-bracelet": "EL-BR-PE-053",
};
