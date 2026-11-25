// Entry for make.fun competition
// u-plucky-finch-20-the-meeting-that-should-have-been-6ce361a9
// "The Meeting That Should Have Been an Email"
//
// The program writes exactly one funny line — a single sentence, a single
// line of plain text, at most 200 characters — to entry.txt in the output
// directory the harness provides (MAKEFUN_OUTPUT_DIR, default /output).
// Node 22+, standard library only, no network, fully deterministic: the
// line is a constant, so every run writes byte-identical output.
//
// The line was chosen from a shortlist of 14 original one-liners scored
// against the judge's five criteria in order (on-topic, laugh with the turn
// on the last word, surprise, economy, recognition). See NOTES.md for the
// full shortlist table and the winning reasoning.
//
// Gate self-check: before writing, the program validates the line against
// the competition gate itself — 1-200 characters, not only whitespace, a
// single line (no newline inside), a single sentence (exactly one terminal
// period, at the end, no other sentence-ending punctuation inside) — and
// refuses to write anything if any check fails, so a bad line can never
// reach the judge. The file is written with no trailing newline: exactly
// the line, so even a strict one-line check sees a single line.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry line: one joke about a meeting that should have been an email.
// Setup is an everyday meeting truth (someone screenshares the email the
// meeting is about); the turn lands on the very last word — the whole
// meeting's only contribution was debating the email's font.
const LINE =
  "Someone screenshared the email this meeting was about, and we spent an hour discussing the font.";

function fail(reason: string): never {
  console.error(`entry line failed gate self-check: ${reason}`);
  process.exit(1);
}

// 1-200 characters, not only whitespace.
if (LINE.length < 1 || LINE.length > 200) {
  fail(`length ${LINE.length} is outside 1-200 characters`);
}
if (LINE.trim().length === 0) {
  fail("line is only whitespace");
}
// Single line: no newline (or carriage return) anywhere inside.
if (/[\r\n]/.test(LINE)) {
  fail("line contains a newline");
}
// Single sentence: exactly one terminal period, at the very end, and no
// other sentence-ending punctuation (! or ?) anywhere inside.
const periods = [...LINE].filter((ch) => ch === ".").length;
if (periods !== 1 || !LINE.endsWith(".")) {
  fail("line must end with exactly one terminal period");
}
if (/[!?]/.test(LINE)) {
  fail("line contains extra sentence-ending punctuation");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
