import { GetFolder } from "./Folder.js";
import { MODULE_ID, OPT_ENABLE_JOURNAL_NOTIFICATION } from "./Settings.js";

export async function CreateJournal(encounterId) {
  const d = new Date();
  const folder = GetFolder();

  const article = {
    title: d.toISOString(),
  };
  const content = {
    html: "",
  };

  await JournalEntry.create(
    {
      name: article.title,
      content: content.html,
      folder: folder ? folder.id : null,
      "flags.fvtt-encounter-stats.encounterId": encounterId,
    },
    { renderSheet: false, activate: false }
  );

  if (game.settings.get(`${MODULE_ID}`, `${OPT_ENABLE_JOURNAL_NOTIFICATION}`)) {
    ui.notifications.info(`fvtt-encounter-stats article ${article.title}`);
  }
}

export async function UpdateJournal(html, article) {
  await article.update({
    name: article.title,
    content: html,
  });
}

export async function GetArticle(encounterId) {
  return game.journal.find(
    (e) => e.getFlag("fvtt-encounter-stats", "encounterId") === encounterId
  );
}
