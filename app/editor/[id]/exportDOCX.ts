import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";

export const generateDOCX = async (templateId: string, data: any) => {
  const { personal, experience, education, skills } = data;

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            text: personal?.name || "Resume",
            heading: HeadingLevel.HEADING_1,
          }),
          new Paragraph({
            text: `${personal?.title || ""} | ${personal?.email || ""} | ${personal?.phone || ""}`,
          }),
          new Paragraph({
            text: personal?.summary || "",
          }),

          new Paragraph({
            text: "Experience",
            heading: HeadingLevel.HEADING_2,
          }),
          ...(experience || []).map((exp: any) => [
            new Paragraph({
              text: `${exp.title} at ${exp.company} (${exp.date})`,
              heading: HeadingLevel.HEADING_3,
            }),
            new Paragraph({ text: exp.description || "" })
          ]).flat(),

          new Paragraph({
            text: "Education",
            heading: HeadingLevel.HEADING_2,
          }),
          ...(education || []).map((edu: any) => [
            new Paragraph({
              text: `${edu.degree} at ${edu.school} (${edu.date})`,
              heading: HeadingLevel.HEADING_3,
            })
          ]).flat(),

          new Paragraph({
            text: "Skills",
            heading: HeadingLevel.HEADING_2,
          }),
          new Paragraph({
            text: skills || "",
          }),
        ],
      },
    ],
  });

  return await Packer.toBlob(doc);
};
