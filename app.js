(() => {
  const storageKey = "campus-stores.shift.v1";
  const root = document.getElementById("campus-stores");
  const q = (selector) => root.querySelector(selector);
  const requests = [
    {
      id: "RQ-214",
      club: "Film Society",
      event: "Courtyard screening",
      owner: "Isha Rao",
      due: "Fri 8 pm",
      items: ["HDMI projector", "Portable speaker", "USB-C → HDMI adapter"],
      note: "Playback is from a USB-C-only laptop. The host will collect at 4 pm.",
    },
    {
      id: "RQ-209",
      club: "Debate Union",
      event: "Finals rehearsal",
      owner: "Tara Shah",
      due: "Sat 10 am",
      items: ["Wireless microphone"],
      note: "Rehearsal runs into the evening.",
    },
    {
      id: "RQ-217",
      club: "Photo Circle",
      event: "Street portrait walk",
      owner: "Dev Menon",
      due: "Sat noon",
      items: ["Digital camera"],
      note: "Collection on Saturday morning.",
    },
  ];
  const assets = [
    { id: "PR-04", type: "HDMI projector", model: "BenQ MH550", bin: "A2" },
    {
      id: "PR-06",
      type: "HDMI projector",
      model: "Epson EB-X49",
      bin: "Workshop",
      repair: true,
    },
    { id: "SP-02", type: "Portable speaker", model: "JBL Eon One", bin: "B1" },
    { id: "SP-05", type: "Portable speaker", model: "Bose S1", bin: "B2" },
    {
      id: "AD-12",
      type: "USB-C → HDMI adapter",
      model: "Belkin AVC002",
      bin: "C4",
    },
    {
      id: "AD-15",
      type: "USB-C → HDMI adapter",
      model: "Anker A8312",
      bin: "C4",
    },
    { id: "MI-09", type: "Wireless microphone", model: "Shure BLX", bin: "B3" },
    { id: "CA-03", type: "Digital camera", model: "Sony A6400", bin: "D2" },
  ];
  const people = [
    "Isha Rao",
    "Kabir Sen",
    "Leela Das",
    "Tara Shah",
    "Dev Menon",
  ];
  const shifts = [
    {
      time: "Friday · 3:45 pm",
      title: "Pickup at the counter",
      text: "Kabir is here for the Film Society screening. The film starts at four. Can he leave with everything he needs?",
      next: "Move to return time",
    },
    {
      time: "Friday · 7:30 pm",
      title: "The kit comes back in pieces",
      text: "Kabir has brought back the projector and speaker. “Leela still has the adapter. She’ll drop it off tomorrow at nine.” Take the return and hand over to the morning shift.",
      next: "Move to next morning",
    },
    {
      time: "Saturday · 9:00 am",
      title: "Morning shift",
      text: "You’ve just taken over. Leela walks in with an adapter. Work out what was outstanding from the screening and close the loan for the right item.",
    },
  ];
  const pages = [
    ["Requests", "clipboard-list"],
    ["Inventory", "package"],
    ["Loan register", "book-open"],
    ["Desk book", "messages-square"],
  ];
  const original = () => ({
    version: 2,
    view: "change",
    check: "",
    promising: 0,
    tab: "Requests",
    phase: 0,
    selected: "",
    filter: "All items",
    loans: [
      {
        num: 401,
        req: "RQ-209",
        asset: "MI-09",
        who: "Tara Shah",
        due: "Sat 10 am",
        back: false,
      },
    ],
    notes: [],
    editing: false,
    onlyOpen: true,
    notice: "Sample shift · All records are fictional.",
  });
  let s = original();
  const getAsset = (id) => assets.find((x) => x.id === id);
  const getReq = (id) => requests.find((x) => x.id === id);
  const out = (id) => s.loans.find((l) => l.asset === id && !l.back);
  // Desk time in minutes from Friday 00:00, so slips can be compared with the clock.
  const nowAt = [945, 1170, 1980];
  const clockShort = ["Fri 3:45 pm", "Fri 7:30 pm", "Sat 9:00 am"];
  const dueAt = {
    "Fri 8 pm": 1200,
    "Sat 9 am": 1980,
    "Sat 10 am": 2040,
    "Sat noon": 2160,
  };
  let focusSel = "";
  const esc = (x) =>
    String(x).replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  const opts = (list) =>
    list
      .map(([v, t]) => '<option value="' + esc(v) + '">' + esc(t) + "</option>")
      .join("");
  const btn = (label, act, val = "", style = "") =>
    '<button type="button" data-action="' +
    act +
    '" data-val="' +
    esc(val) +
    '" class="' +
    style +
    '">' +
    esc(label) +
    "</button>";
  const head = (title, sub, control = "") =>
    '<div class="sectionhead"><div><h2>' +
    title +
    "</h2><small>" +
    sub +
    "</small></div>" +
    control +
    "</div>";
  const row = (label, sub, right) =>
    '<div class="row"><div><strong>' +
    esc(label) +
    "</strong><small>" +
    esc(sub) +
    "</small></div><div>" +
    right +
    "</div></div>";
  const badge = (t, good = false) =>
    '<span class="tag' + (good ? " good" : "") + '">' + esc(t) + "</span>";
  function requestPage() {
    let html = head(
      "Approved requests",
      "Student Activities Office · 3 approved forms",
    );
    if (s.selected) {
      const r = getReq(s.selected);
      html +=
        btn("Back to list", "close") +
        '<div class="record"><small>' +
        r.id +
        " · Approved</small><h3>" +
        r.event +
        "</h3><p>" +
        r.club +
        " · Filed by " +
        r.owner +
        "</p><p><b>Return by</b> " +
        r.due +
        "</p><p><b>Approved equipment</b></p><ul>" +
        r.items.map((x) => "<li>" + x + "</li>").join("") +
        "</ul><p>" +
        r.note +
        "</p></div>";
    } else
      html += requests
        .map((r) =>
          row(
            r.event,
            r.id + " · " + r.club,
            btn("View form", "request", r.id),
          ),
        )
        .join("");
    return html;
  }
  function inventory() {
    let html = head(
      "Inventory",
      "Physical units · home shelf and current availability",
    );
    html +=
      '<div class="buttons"><label>Show <select data-filter>' +
      opts(
        ["All items", "On shelf", "On loan", "In repair"].map((f) => [f, f]),
      ) +
      "</select></label></div>";
    for (const a of assets) {
      const status = a.repair
        ? "In repair"
        : out(a.id)
          ? "On loan"
          : "On shelf";
      if (s.filter !== "All items" && s.filter !== status) continue;
      html += row(
        a.id + " · " + a.type,
        a.model + " · " + a.bin,
        badge(status, status === "On shelf"),
      );
    }
    return html;
  }
  function register() {
    let html = head(
      "Loan register",
      "One slip per physical unit",
      s.editing
        ? btn("Cancel", "cancel")
        : btn("New issue slip", "new", "", "primary"),
    );
    if (s.editing) {
      const available = assets.filter((a) => !a.repair && !out(a.id));
      const select = (label, key, options) =>
        "<label><span>" +
        label +
        '</span><select name="' +
        key +
        '" required><option value="">Select…</option>' +
        opts(options) +
        "</select></label>";
      return (
        html +
        '<form data-issue><div class="form">' +
        select(
          "Approved request",
          "req",
          requests.map((r) => [r.id, r.id + " · " + r.club]),
        ) +
        select(
          "Unit leaving the desk",
          "asset",
          available.map((a) => [a.id, a.id + " · " + a.type]),
        ) +
        select(
          "Collected by",
          "who",
          people.map((p) => [p, p]),
        ) +
        select(
          "Return by",
          "due",
          ["Fri 8 pm", "Sat 9 am", "Sat 10 am", "Sat noon"].map((d) => [d, d]),
        ) +
        '</div><button type="submit" class="primary">Save issue slip</button></form>'
      );
    }
    html +=
      '<div class="buttons">' +
      ["Outstanding", "All slips"]
        .map(
          (v, i) =>
            '<button type="button" data-action="scope" data-val="' +
            i +
            '" aria-pressed="' +
            (s.onlyOpen === (i === 0)) +
            '">' +
            v +
            "</button>",
        )
        .join("") +
      "</div>";
    const shown = s.loans
      .filter((l) => !s.onlyOpen || !l.back)
      .slice()
      .reverse();
    if (!shown.length) html += "<p>No outstanding slips.</p>";
    for (const l of shown)
      html += row(
        "L-" + l.num + " · " + l.asset,
        l.req + " · " + l.who + " · Due " + l.due,
        l.back
          ? badge("Returned")
          : btn("Record return", "return", String(l.num)),
      );
    return html;
  }
  function deskbook() {
    let html = head(
      "Desk book",
      "Messages from clubs and notes for the next shift",
    );
    const entries = [
      [
        "Friday · 3:20 pm",
        "Isha Rao · Film Society",
        "Kabir Sen is picking up our whole screening kit. Please issue it in his name. I’m setting up in the courtyard.",
      ],
      [
        "Friday · 3:30 pm",
        "Tara Shah · Debate Union",
        "Our microphone stays with me overnight. I’ll return it by 10 am Saturday.",
      ],
    ];
    if (s.phase >= 1)
      entries.push([
        "Friday · 7:30 pm",
        "Kabir Sen · Film Society",
        "I brought the projector and speaker. Leela Das has our adapter. She’ll be at the counter at 9 am tomorrow.",
      ]);
    if (s.view === "change")
      for (const l of s.loans.filter((x) => x.promise)) {
        const a = getAsset(l.asset),
          r = getReq(l.req),
          p = l.promise,
          lead = a.id + " (" + a.type + ") from the " + r.club + " kit, " + r.id;
        const at = l.closed ?? s.phase;
        entries.push([
          shifts[p.phase].time,
          "Loan register · L-" + l.num + (l.back ? " · Closed" : " · Open"),
          l.back
            ? lead +
              ", came back " +
              clockShort[at] +
              (nowAt[at] <= dueAt[p.by]
                ? ". " + p.holder + " kept the promise."
                : ", later than " + p.holder + " promised.")
            : lead +
              ", is still out. " +
              p.holder +
              " has it and promised it back by " +
              p.by +
              ". " +
              l.who +
              " signed for it.",
        ]);
      }
    for (const n of s.notes)
      entries.push([shifts[n.phase].time, "Counter handover", n.text]);
    for (const [t, author, body] of entries.slice().reverse())
      html +=
        '<article class="record"><small>' +
        esc(t) +
        "</small><h3>" +
        esc(author) +
        "</h3><p>" +
        esc(body) +
        "</p></article>";
    return (
      html +
      '<form data-note><div class="form"><label class="full"><span>Note for the next shift</span><textarea name="note" rows="2" maxlength="400" required></textarea></label></div><button type="submit">Add handover note</button></form>'
    );
  }
  // Promised returns: a unit that doesn't come back carries who has it and when.
  const kitOf = (req) => s.loans.filter((l) => l.req === req);
  const late = (l) => nowAt[s.phase] > dueAt[l.due];
  const twins = (a) =>
    assets.filter((x) => x.id !== a.id && x.type === a.type && x.bin === a.bin);
  // Forgiving tag entry: "ad12", "AD 12" and "ad-12" all mean AD-12.
  const tagOf = (t) =>
    String(t || "")
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .replace(/^([A-Z]+)(\d+)$/, "$1-$2");
  const field = (label, key, options) =>
    "<label><span>" +
    label +
    '</span><select name="' +
    key +
    '" required><option value="">Select…</option>' +
    opts(options) +
    "</select></label>";
  function promiseTag(l) {
    const p = l.promise;
    if (!p)
      return late(l)
        ? '<span class="tag warn">Overdue since ' + esc(l.due) + "</span> "
        : "";
    const gap = nowAt[s.phase] - dueAt[p.by];
    if (gap > 0)
      return (
        '<span class="tag warn">Promise missed · ask ' +
        esc(getReq(l.req).owner) +
        "</span> "
      );
    return (
      '<span class="tag promise">' +
      (gap === 0 ? "Due now" : "Promised " + esc(p.by)) +
      " · " +
      esc(p.holder) +
      "</span> "
    );
  }
  function checkCard() {
    if (!s.check) return "";
    const a = getAsset(s.check);
    const l = a && out(a.id);
    let body;
    if (!a)
      body =
        "<h3>No unit is tagged " +
        esc(s.check) +
        "</h3><p>Tags look like AD-12. Read the label on the unit again.</p>";
    else if (!l) {
      const open = s.loans.filter(
        (x) => !x.back && getAsset(x.asset).type === a.type,
      );
      body =
        "<h3>" +
        esc(a.id) +
        " is not on loan</h3><p>" +
        esc(
          a.id +
            " · " +
            a.model +
            (a.repair
              ? " is in the workshop."
              : " belongs on the shelf in " + a.bin + "."),
        ) +
        "</p>" +
        (open.length
          ? "<p>" +
            esc(
              "Open " +
                a.type +
                " slips: " +
                open
                  .map(
                    (x) =>
                      "L-" +
                      x.num +
                      " · " +
                      x.asset +
                      " (" +
                      getAsset(x.asset).model +
                      ")",
                  )
                  .join(", ") +
                ". Check the label again.",
            ) +
            "</p>"
          : "");
    } else {
      const r = getReq(l.req),
        tw = twins(a);
      body =
        "<small>Slip L-" +
        l.num +
        " · " +
        esc(r.id) +
        "</small><h3>" +
        esc(a.id + " · " + a.type) +
        "</h3><p>" +
        esc(
          r.club +
            " · " +
            r.event +
            ". Signed out to " +
            l.who +
            ", due " +
            l.due +
            ".",
        ) +
        "</p>" +
        (l.promise
          ? "<p>" +
            esc(l.promise.holder + " promised it back by " + l.promise.by + ".") +
            "</p>"
          : "") +
        (tw.length
          ? '<p class="warnline">Check the label says <b>' +
            esc(a.id + " · " + a.model) +
            "</b>. " +
            esc(
              tw.map((x) => x.id + " (" + x.model + ")").join(", ") +
                " is the same type in the same bin, " +
                a.bin +
                ".",
            ) +
            "</p>"
          : "") +
        '<div class="buttons">' +
        btn("Close slip L-" + l.num, "closeslip", String(l.num), "primary") +
        btn("Not this unit", "uncheck") +
        "</div>";
    }
    if (!l) body += '<div class="buttons">' + btn("Clear", "uncheck") + "</div>";
    return (
      '<div class="record confirm" role="group" aria-label="Check-in result">' +
      body +
      "</div>"
    );
  }
  function expected() {
    const due = s.loans
      .filter((l) => !l.back && l.promise)
      .sort((x, y) => dueAt[x.promise.by] - dueAt[y.promise.by]);
    if (!due.length) return "";
    return (
      '<div class="record expect"><small>Expected at the counter</small>' +
      due
        .map((l) => {
          const a = getAsset(l.asset),
            r = getReq(l.req);
          return row(
            a.id + " · " + a.type + " · from " + l.promise.holder,
            r.club +
              " · " +
              r.id +
              " · promised " +
              l.promise.by +
              " · was due " +
              l.due,
            promiseTag(l) + btn("Check in", "pick", a.id),
          );
        })
        .join("") +
      "</div>"
    );
  }
  function registerChange() {
    if (s.editing) return register();
    let html =
      head(
        "Loan register",
        "One slip per physical unit · grouped by request",
        btn("New issue slip", "new", "", "primary"),
      ) +
      '<form data-checkin class="checkin"><label><span>Unit in hand</span><input name="tag" autocomplete="off" spellcheck="false" placeholder="Type or scan its tag, e.g. AD-12" required /></label><button type="submit">Check in</button></form>' +
      checkCard() +
      expected() +
      '<div class="buttons">' +
      ["Outstanding", "All slips"]
        .map(
          (v, i) =>
            '<button type="button" data-action="scope" data-val="' +
            i +
            '" aria-pressed="' +
            (s.onlyOpen === (i === 0)) +
            '">' +
            v +
            "</button>",
        )
        .join("") +
      "</div>";
    const shown = s.loans.filter((l) => !s.onlyOpen || !l.back).reverse();
    if (!shown.length) html += "<p>No outstanding slips.</p>";
    for (const id of new Set(shown.map((l) => l.req))) {
      const r = getReq(id),
        kit = kitOf(id),
        back = kit.filter((l) => l.back).length,
        still = kit.filter((l) => !l.back).map((l) => l.asset);
      html +=
        '<div class="kit"><div class="kithead"><strong>' +
        esc(r.club + " · " + r.event) +
        "</strong><small>" +
        esc(r.id + " · " + back + " of " + kit.length + " back") +
        (back && still.length
          ? ' · <b class="still">' + esc(still.join(", ")) + " still out</b>"
          : "") +
        "</small></div>";
      for (const l of shown.filter((x) => x.req === id)) {
        const a = getAsset(l.asset);
        const ask = !l.back && !l.promise && (back > 0 || late(l));
        html += row(
          "L-" + l.num + " · " + a.id + " · " + a.type,
          "Signed out to " + l.who + " · Due " + l.due,
          l.back
            ? badge("Returned")
            : promiseTag(l) +
                (ask ? btn("Who has it?", "promising", String(l.num)) + " " : "") +
                btn("Check in", "pick", a.id),
        );
        if (ask && s.promising === l.num)
          html +=
            '<form data-promise data-num="' +
            l.num +
            '" class="promise"><p><b>' +
            esc(a.id) +
            " is still out.</b> Ask who has it now and when it will be back.</p><div class=\"form\">" +
            field("Who has it now", "holder", people.map((p) => [p, p])) +
            field(
              "Back by",
              "by",
              Object.keys(dueAt).map((d) => [d, d]),
            ) +
            '</div><div class="buttons"><button type="submit" class="primary">Save promise</button>' +
            btn("Cancel", "promising", "0") +
            "</div></form>";
      }
      html += "</div>";
    }
    return html;
  }
  const screens = {
    Requests: requestPage,
    Inventory: inventory,
    "Loan register": () => (s.view === "change" ? registerChange() : register()),
    "Desk book": deskbook,
  };
  function paint() {
    const phase = shifts[s.phase];
    q("[data-clock]").textContent = phase.time;
    q("[data-shift-title]").textContent = phase.title;
    q("[data-shift]").textContent = phase.text;
    const advance = q('[data-action="advance"]');
    advance.hidden = !phase.next;
    advance.textContent = phase.next || "";
    q("[data-nav]").innerHTML = pages
      .map(
        ([n, icon]) =>
          '<button type="button" data-action="tab" data-val="' +
          n +
          '" aria-pressed="' +
          (s.tab === n) +
          '"><svg aria-hidden="true" class="store-icon"><use href="#icon-' +
          icon +
          '"></use></svg>' +
          n +
          "</button>",
      )
      .join("");
    q("[data-page]").innerHTML = screens[s.tab]();
    if (q("[data-filter]")) q("[data-filter]").value = s.filter;
    q("[data-status]").textContent = s.notice;
    root
      .querySelectorAll('[data-action="view"]')
      .forEach((b) =>
        b.setAttribute("aria-pressed", String(s.view === b.dataset.val)),
      );
    if (focusSel) {
      const el = q(focusSel);
      focusSel = "";
      if (el) el.focus();
    }
  }
  function commit(msg) {
    if (msg) s.notice = msg;
    paint();
    try {
      localStorage.setItem(storageKey, JSON.stringify(s));
    } catch {
      q("[data-status]").textContent +=
        " Browser storage is unavailable. Progress lasts for this visit.";
    }
  }
  root.addEventListener("click", (e) => {
    const b = e.target.closest("[data-action]");
    if (!b) return;
    const v = b.dataset.val;
    switch (b.dataset.action) {
      case "restart":
        s = original();
        break;
      case "advance": {
        if (s.phase < 2) s.phase++;
        s.notice = "Shift time updated.";
        s.check = "";
        const due = s.loans.filter((l) => !l.back && l.promise);
        if (s.view === "change" && due.length)
          s.notice +=
            " Expected at the counter: " +
            due
              .map(
                (l) =>
                  l.asset +
                  " from " +
                  l.promise.holder +
                  ", promised " +
                  l.promise.by,
              )
              .join("; ") +
            ".";
        break;
      }
      case "tab":
        s.tab = v;
        s.editing = false;
        break;
      case "close":
        s.selected = "";
        break;
      case "request":
        s.selected = v;
        break;
      case "new":
        s.editing = true;
        break;
      case "cancel":
        s.editing = false;
        break;
      case "scope":
        s.onlyOpen = v === "0";
        break;
      case "return": {
        const l = s.loans.find((l) => l.num === Number(v));
        if (!l || l.back) return;
        l.back = true;
        l.closed = s.phase;
        s.notice = l.asset + " returned to stock. Slip L-" + l.num + " closed.";
        break;
      }
      case "view":
        s.view = v === "original" ? "original" : "change";
        s.check = "";
        s.promising = 0;
        s.notice =
          s.view === "change"
            ? "Showing the desk with promised returns."
            : "Showing the original desk.";
        break;
      case "pick":
        s.check = v;
        s.promising = 0;
        focusSel = '[data-action="closeslip"]';
        break;
      case "uncheck":
        s.check = "";
        focusSel = "[data-checkin] input";
        break;
      case "promising":
        s.promising = Number(v);
        focusSel = "[data-promise] select";
        break;
      case "closeslip": {
        const l = s.loans.find((l) => l.num === Number(v));
        if (!l || l.back) return;
        l.back = true;
        l.closed = s.phase;
        s.check = "";
        const r = getReq(l.req),
          still = kitOf(l.req)
            .filter((k) => !k.back)
            .map((k) => k.asset);
        s.notice =
          l.asset +
          " is back in " +
          getAsset(l.asset).bin +
          ". Slip L-" +
          l.num +
          " closed." +
          (l.promise
            ? nowAt[s.phase] <= dueAt[l.promise.by]
              ? " " + l.promise.holder + " kept the promise."
              : " Later than " + l.promise.holder + " promised."
            : "") +
          (still.length
            ? " Still out from " + r.club + ": " + still.join(", ") + "."
            : "");
        focusSel = "[data-checkin] input";
        break;
      }
    }
    commit();
  });
  root.addEventListener("change", (e) => {
    if (e.target.matches("[data-filter]")) {
      s.filter = e.target.value;
      commit();
    }
  });
  root.addEventListener("submit", (e) => {
    e.preventDefault();
    const f = e.target;
    const form = new FormData(f);
    if (f.matches("[data-note]")) {
      const text = String(form.get("note")).trim();
      if (!text) return;
      s.notes.push({ phase: s.phase, text });
      commit("Handover note saved.");
      return;
    }
    if (f.matches("[data-checkin]")) {
      s.check = tagOf(form.get("tag"));
      s.promising = 0;
      const a = getAsset(s.check),
        l = a && out(a.id);
      focusSel = l ? '[data-action="closeslip"]' : "[data-checkin] input";
      commit(
        l
          ? s.check +
              " is on slip L-" +
              l.num +
              ". Check the label, then close the slip."
          : "No open slip for " + s.check + ".",
      );
      return;
    }
    if (f.matches("[data-promise]")) {
      const l = s.loans.find((x) => x.num === Number(f.dataset.num));
      const holder = form.get("holder"),
        by = form.get("by");
      if (!l || l.back || !people.includes(holder) || !Object.hasOwn(dueAt, by))
        return;
      l.promise = { holder, by, phase: s.phase };
      s.promising = 0;
      commit(
        "Saved on L-" +
          l.num +
          ": " +
          holder +
          " has " +
          l.asset +
          " and promised it back by " +
          by +
          ". The next shift sees it at the top of the register.",
      );
      return;
    }
    if (!f.matches("[data-issue]")) return;
    const [req, asset, who, due] = ["req", "asset", "who", "due"].map((k) =>
      form.get(k),
    );
    const unit = getAsset(asset),
      r = getReq(req);
    if (!r || !unit || unit.repair || out(asset) || !people.includes(who))
      return;
    if (!r.items.includes(unit.type)) {
      q("[data-status]").textContent =
        "This equipment type is outside the approved request. Choose an approved unit.";
      return;
    }
    if (
      s.loans.some(
        (l) => l.req === req && !l.back && getAsset(l.asset).type === unit.type,
      )
    ) {
      q("[data-status]").textContent =
        "The approved quantity of this equipment type is already on loan.";
      return;
    }
    const num = Math.max(...s.loans.map((l) => l.num)) + 1;
    s.loans.push({ num, req, asset, who, due, back: false });
    s.editing = false;
    commit("Issued " + asset + " to " + who + " on slip L-" + num + ".");
  });
  function restore(d) {
    if (
      !d ||
      ![1, 2].includes(d.version) ||
      !Object.hasOwn(screens, d.tab) ||
      !shifts[d.phase] ||
      (d.selected && !getReq(d.selected)) ||
      !Array.isArray(d.notes) ||
      !d.notes.every(
        (n) => n && shifts[n.phase] && typeof n.text === "string",
      ) ||
      !Array.isArray(d.loans) ||
      !d.loans.length ||
      !d.loans.every(
        (l) =>
          l &&
          getReq(l.req) &&
          getAsset(l.asset) &&
          Number.isInteger(l.num) &&
          (l.closed === undefined || shifts[l.closed]) &&
          (!l.promise ||
            (people.includes(l.promise.holder) &&
              Object.hasOwn(dueAt, l.promise.by) &&
              shifts[l.promise.phase])),
      )
    )
      return;
    // Version 1 shifts load as-is; they simply have no promises yet.
    s = {
      ...original(),
      ...d,
      version: 2,
      view: d.view === "original" ? "original" : "change",
      check: "",
      promising: 0,
      loans: d.loans.map((l) => ({
        ...l,
        ...(l.promise && { promise: { ...l.promise } }),
      })),
      notes: d.notes.map((n) => ({ ...n })),
    };
    paint();
  }
  paint();
  try {
    restore(JSON.parse(localStorage.getItem(storageKey)));
  } catch {
    // Keep the fresh shift when storage is unavailable or the saved data is invalid.
  }
})();
