# Campus Stores: my review

**Would I keep this product? Yes.** One slip per physical unit is the right model, and it's why Kabir's partial return was recorded exactly. **The moment I'd change is that same return.** The product knows *what* didn't come back, but not *who has it* or *when it's coming back*. That promise ends up in free text, and it fails silently the next morning, in front of someone who wasn't there.

**Play it:** <https://rajdhanavade17.github.io/campus-stores/>, or open `index.html`. Use **Original / With my change** in the top strip to replay the same shift both ways. **Restart sample shift** resets it.

## My shift

| Desk time | What I did | What the product did |
| --- | --- | --- |
| Fri 3:45 pm | Issued the Film Society kit to Kabir. Isha authorised that in the Desk book at 3:20 pm. | Three slips: L-402 PR-04 projector, L-403 SP-02 speaker, L-404 AD-12 adapter. Every slip starts blank, so that was 12 dropdown picks with the film 15 minutes away. |
| Fri 7:30 pm | Kabir brought back the projector and speaker: "Leela still has the adapter. She'll drop it off tomorrow at nine." | I closed L-402 and L-403. L-404 stayed open, still reading "Kabir Sen · Due Fri 8 pm". |
| Sat 9:00 am | Leela walked in with an adapter. | Leela isn't on any slip. L-404 is 13 hours past due and nothing flags it. Her promise only exists in the Desk book: Kabir's message and whatever note I left. |

## A moment it handles well: the partial return at 7:30 pm

Every unit leaves on its own slip, so recording "two of three came back" took two clicks and no thinking. I closed L-402 and L-403, and L-404 stayed open. Inventory immediately showed AD-12 **On loan**. Its twin AD-15, the same kind of adapter in the same bin (C4), stayed **On shelf**. Nothing had to be re-keyed, and there was no "partial" flag to get wrong.

The issue guards earned their keep too. The broken projector PR-06 was never offered while I was rushing. When I tried a second adapter on the same request, it refused: *"The approved quantity of this equipment type is already on loan."*

## A moment I'd change: the promise made at 7:30 pm

Kabir told me two facts the record had no place for: **Leela** has the adapter, and she'll bring it back **at 9 tomorrow**.

- The open slip kept saying "Kabir Sen · Due Fri 8 pm". There's no field for who holds a unit now or when it's promised back.
- The only way to get Leela's name and a new time into a record is to mark AD-12 returned (it wasn't) and re-issue it to her for "Sat 9 am". The product accepted that as L-405 and left a false "Returned" on L-404.
- So the promise went into a Desk book note. Notes can't be linked to a slip or closed, so after Leela returns the adapter, the note still says it's out.
- At 9:00 am the morning shift has to rebuild the story: Leela, then the Film Society, then the adapter, then which slip. "Record return" never asks which unit is in your hand, and AD-12 and AD-15 sit in the same bin.

I picked this over the slow pickup on purpose. The pickup is slow but correct, and everyone at the counter can see that it's slow. The handover looks finished at 7:30 pm and only fails at 9:00 am, in front of someone who wasn't there, so I'd fix the silent failure first. It's the same problem as a ward shift handover: the fact that matters most should live on the record, not in a note beside it.

## My change: promised returns

A unit that doesn't come back now carries its own handover.

1. **Kits, not just slips.** The register groups slips by request, for example "Film Society · Courtyard screening · 2 of 3 back · AD-12 still out". After each check-in, the status line says what's still out from that kit.
2. **"Who has it?"** A unit that's still out from a partly returned kit, or is overdue, asks who has it now and when it will be back. I pick Leela Das and Sat 9 am. Kabir stays the borrower. If the promise is missed, the tag says to ask Isha Rao, who filed the request.
3. **Expected at the counter.** The promise sits at the top of the register: "AD-12 · from Leela Das · Film Society · promised Sat 9 am · was due Fri 8 pm". When the clock moves to the morning, the status bar announces it.
4. **Check in from the tag in your hand.** Type or scan the unit's tag. `ad12`, `AD 12` and `AD-12` all work. The confirm card shows the slip, the club, who signed, the promise, and a twin warning: *"Check the label says AD-12 · Belkin AVC002. AD-15 (Anker A8312) is the same type in the same bin, C4."* Typing AD-15 says it isn't on loan and points to L-404 instead.
5. **The handover writes itself.** The Desk book gets an entry generated from the slip, so the note and the record can't disagree. When the slip closes, the entry changes to "came back Sat 9:00 am. Leela Das kept the promise."

## The same job with my change

**Fri 3:45 pm, pickup (unchanged).** I issue L-402, L-403 and L-404 to Kabir exactly as before.

**Fri 7:30 pm, return.** I type `PR-04` and confirm, then `SP-02` and confirm. The status line says "Still out from Film Society: AD-12". I press **Who has it?** on L-404 and pick Leela Das and Sat 9 am. That's the whole handover. There's no free text to write, and the Desk book entry is written for me.

**Sat 9:00 am, morning.** The status bar says "Expected at the counter: AD-12 from Leela Das, promised Sat 9 am", and the top of the register shows the same thing, tagged **Due now**. Leela hands over the adapter. I type its tag, compare the twin warning with the label, and close L-404. The status bar says "Leela Das kept the promise", and the Desk book entry closes too.

| At 9:00 am | Original | With my change |
| --- | --- | --- |
| Who is Leela, and what is she returning? | She isn't on any slip. Find Kabir's message in the Desk book. | "Expected at the counter: AD-12 from Leela Das" |
| Is it late? | "Due Fri 8 pm", with no flag | Promised Sat 9 am, tagged **Due now**, "was due Fri 8 pm" |
| Which slip do I close? | Pick one from the list | Type the tag in hand, and it finds L-404 |
| What if it's actually AD-15? | Nothing stops me closing L-404 | "AD-15 is not on loan", pointing to L-404 · AD-12 |
| Is the handover note still true afterwards? | No. It still says the adapter is out. | Yes. It closes with the slip. |

## What I kept, and why

- **One slip per physical unit.** It made the partial return exact, and promises attach to it.
- **The issue guards:** approved types only, the approved quantity, and nothing from the workshop. They stop the costly mistakes at the busiest moment.
- **The issue form and the pickup flow,** unchanged. They're slow, but correct.
- **The Desk book as the place where clubs talk to the desk.** Isha's authorisation and Tara's overnight message belong there. It just stops being the only place a promise lives.
- **Bins, the inventory filter, and one offline page with no accounts.** It's a desk tool that keeps working when the Wi-Fi doesn't.

## The observation that would tell me it helped

When someone walks in with a promised item, **listen to the worker's first sentence.** "Is that the Film Society's adapter?" means the promise reached the next shift. "What's this for?", or a trip to the Desk book, means it didn't. I'd tally that for every partial return over the first week. If the answer is still "What's this for?", I'd check which end failed: either the promise wasn't recorded at the return, or the morning shift didn't see it.

## What I noticed but left alone

- **Pickup is twelve blank dropdowns for one kit.** Nothing is prefilled from the request: not the approved units, the collector, or the due date. It's the next thing I'd fix.
- **The issue form doesn't check slips against the request.** I issued the Photo Circle's camera to Leela with a Fri 8 pm due date, though the request says Sat noon, and it was accepted.
- **"Record return" is one click with no undo.** Under "Outstanding", the closed row disappears and the next slip slides into its place. A quick double click on the projector's slip can therefore close Tara's microphone. My check-in adds a confirm step, which removes this too.
- **Who may collect lives only in the Desk book.** Isha's "issue it in his name" is two tabs away from the issue form.

## Engineering notes

- The change is additive. The original register is untouched and still renders under **Original**. The Desk book only adds generated entries in the new view.
- A slip gains an optional `promise` (`holder`, `by`, `phase`) and `closed` (the desk time it came back). Saved shifts are now version 2. Version 1 saves still load; they just have no promises yet.
- Desk times map to minutes, so "overdue", "due now" and "promise missed" come from the clock, not from text.
- The tag field is a plain input that submits on Enter, so a USB barcode scanner works without extra code. After a match, focus moves to **Close slip**. After closing, it returns to the tag field, so the keyboard loop is scan, Enter, Enter. Results go to the existing `aria-live` status line.
- There are no new dependencies, and it still runs offline from `index.html`.
- I used Claude Code, an AI coding assistant, to help build and check the prototype.

---

## About the exercise

Campus Stores is a Product Engineer work sample set at a fictional campus media equipment desk. Work through a club’s screening, from equipment pickup to a partial return and the next morning’s handover. Open **Candidate brief** in the app for the assignment.

### Run the app

Open `index.html` in a modern browser. The app includes its scripts, styles, and icons and can run offline.

To serve it over local HTTP, run this from the repository folder and visit `http://localhost:8000`.

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Each browser stores its own sample shift locally when browser storage is available. **Restart sample shift** restores the fictional starting records.

### Source

- `index.html` contains the desk layout, candidate brief, and bundled icons.
- `app.js` contains the sample records and interactions.
- `styles.css` defines the desktop and mobile layouts.

Icon license notices are in [third-party/lucide-LICENSE.txt](third-party/lucide-LICENSE.txt).

### Submit your work

1. [Fork Campus Stores](https://github.com/virinchi-healthcare/campus-stores/fork) into your GitHub account. Complete the candidate brief and push your changes to your public fork. In your README, point reviewers to your work and explain the decision you made.
2. In your fork, open **Commits**, select the final commit you want reviewed, and copy the page URL. It should look like `https://github.com/YOUR-USERNAME/campus-stores/commit/COMMIT-SHA`.
3. [Submit your work through the Google Form](https://docs.google.com/forms/d/e/1FAIpQLScvzoh1R4WS-SkiwAVBQbMvniieJYSoOEfLMyVo5CyjOvYUgQ/viewform). Your **roll number**, **email ID**, and **final commit link from your public fork** are required. Enter your roll number and email ID in the form only.
