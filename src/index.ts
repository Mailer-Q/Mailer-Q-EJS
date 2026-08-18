import fs from "fs";
import path from "path";
import ejs from "ejs";

/** Local variables passed through to the template. */
type MailerQLocals = Record<string, unknown>;

/** A MailerQ renderer: turns a template file plus locals into an HTML string. */
type MailerQRenderer = (
  templateFileName: string,
  locals: MailerQLocals,
) => string;

/**
 * Create an EJS renderer for MailerQ. Call with the directory that holds your
 * email templates; the returned function reads and renders a template on demand.
 *
 * @param dirPath Absolute path to the directory containing the templates.
 */
const MailerQEjs = (dirPath: string): MailerQRenderer => {
  return (templateFileName, locals) => {
    const templateString = fs.readFileSync(
      path.join(dirPath, templateFileName),
      "utf8",
    );

    return ejs.render(templateString, locals);
  };
};

export = MailerQEjs;
