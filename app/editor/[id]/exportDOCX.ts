import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
} from "docx";

export const generateDOCX = async (
  templateId: string,
  resumeData: {
    personal: any;
    experience: any[];
    education: any[];
    skills: string;
  }
) => {
  const { personal, experience, education, skills } = resumeData;
  const isCreative = templateId.includes("creative");
  const isModern = templateId === "modern-professional" || templateId === "executive-pro";

  // Choose styles based on template
  const primaryColor = isCreative ? "005954" : isModern ? "0F172A" : "000000";
  const accentColor = isCreative ? "14B8A6" : isModern ? "4F46E5" : "4338CA";

  const children = [];

  // --- HEADER SECTION ---
  if (isCreative) {
    // Creative Header (table simulation of sidebar/main)
    children.push(
      new Paragraph({
        text: (personal.name || "Your Name").toUpperCase(),
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.LEFT,
        style: "CreativeTitle",
      })
    );
    children.push(
      new Paragraph({
        text: (personal.title || "Professional Title").toUpperCase(),
        heading: HeadingLevel.HEADING_2,
        alignment: AlignmentType.LEFT,
        style: "CreativeSubtitle",
      })
    );
    children.push(
      new Paragraph({
        text: [personal.email, personal.phone, personal.website, personal.address].filter(Boolean).join(" | "),
        alignment: AlignmentType.LEFT,
        style: "ContactInfo",
      })
    );
  } else if (isModern) {
    // Modern Header (centered, dark theme approximation)
    children.push(
      new Paragraph({
        text: (personal.name || "Your Name").toUpperCase(),
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
      })
    );
    children.push(
      new Paragraph({
        text: (personal.title || "Professional Title").toUpperCase(),
        heading: HeadingLevel.HEADING_2,
        alignment: AlignmentType.CENTER,
      })
    );
    children.push(
      new Paragraph({
        text: [personal.email, personal.phone, personal.address, personal.website].filter(Boolean).join("  •  "),
        alignment: AlignmentType.CENTER,
        style: "ContactInfo",
      })
    );
  } else {
    // Minimal Header
    children.push(
      new Paragraph({
        text: (personal.name || "Your Name").toUpperCase(),
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
      })
    );
    children.push(
      new Paragraph({
        text: (personal.title || "Professional Title").toUpperCase(),
        heading: HeadingLevel.HEADING_2,
        alignment: AlignmentType.CENTER,
      })
    );
    children.push(
      new Paragraph({
        text: [personal.email, personal.phone, personal.address, personal.website].filter(Boolean).join("  •  "),
        alignment: AlignmentType.CENTER,
        style: "ContactInfo",
      })
    );
  }

  children.push(new Paragraph({ text: "", spacing: { before: 200, after: 200 } }));

  // --- SUMMARY SECTION ---
  if (personal.summary) {
    children.push(
      new Paragraph({
        text: "PROFILE",
        heading: HeadingLevel.HEADING_3,
        style: "SectionHeading",
      })
    );
    children.push(
      new Paragraph({
        text: personal.summary,
        style: "NormalText",
      })
    );
    children.push(new Paragraph({ text: "", spacing: { after: 200 } }));
  }

  // --- EXPERIENCE SECTION ---
  if (experience && experience.length > 0) {
    children.push(
      new Paragraph({
        text: "EXPERIENCE",
        heading: HeadingLevel.HEADING_3,
        style: "SectionHeading",
      })
    );

    experience.forEach((exp) => {
      // Job Title and Date
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: exp.title || "Job Title", bold: true, size: 24 }),
            new TextRun({ text: `\t${exp.date || "Date"}`, size: 20, color: "666666" }),
          ],
          tabStops: [
            {
              type: "right",
              position: 9000,
            },
          ],
        })
      );
      // Company Name
      children.push(
        new Paragraph({
          text: exp.company || "Company Name",
          style: "SubHeading",
        })
      );
      // Description (Handle newlines)
      if (exp.description) {
        const lines = exp.description.split("\n");
        lines.forEach((line: string) => {
          if (line.trim()) {
            children.push(
              new Paragraph({
                text: line.trim(),
                style: "NormalText",
                indent: { left: 360 }, // Small indent for bullets
              })
            );
          }
        });
      }
      children.push(new Paragraph({ text: "", spacing: { after: 200 } }));
    });
  }

  // --- EDUCATION SECTION ---
  if (education && education.length > 0) {
    children.push(
      new Paragraph({
        text: "EDUCATION",
        heading: HeadingLevel.HEADING_3,
        style: "SectionHeading",
      })
    );

    education.forEach((edu) => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: edu.school || "School Name", bold: true, size: 24 }),
            new TextRun({ text: `\t${edu.date || "Date"}`, size: 20, color: "666666" }),
          ],
          tabStops: [
            {
              type: "right",
              position: 9000,
            },
          ],
        })
      );
      children.push(
        new Paragraph({
          text: edu.degree || "Degree",
          style: "NormalText",
        })
      );
      children.push(new Paragraph({ text: "", spacing: { after: 100 } }));
    });
    children.push(new Paragraph({ text: "", spacing: { after: 100 } }));
  }

  // --- SKILLS SECTION ---
  if (skills) {
    children.push(
      new Paragraph({
        text: "SKILLS",
        heading: HeadingLevel.HEADING_3,
        style: "SectionHeading",
      })
    );
    children.push(
      new Paragraph({
        text: skills,
        style: "NormalText",
      })
    );
  }

  // Define Document Styles based on template
  const doc = new Document({
    styles: {
      paragraphStyles: [
        {
          id: "Heading1",
          name: "Heading 1",
          basedOn: "Normal",
          next: "Normal",
          quickFormat: true,
          run: {
            size: isModern ? 48 : 40,
            bold: true,
            color: primaryColor,
            font: isMinimal() ? "Georgia" : "Arial",
          },
          paragraph: {
            spacing: { after: 120 },
          },
        },
        {
          id: "Heading2",
          name: "Heading 2",
          basedOn: "Normal",
          next: "Normal",
          quickFormat: true,
          run: {
            size: 24,
            color: accentColor,
            font: isMinimal() ? "Georgia" : "Arial",
          },
          paragraph: {
            spacing: { after: 120 },
          },
        },
        {
          id: "SectionHeading",
          name: "Section Heading",
          basedOn: "Normal",
          next: "Normal",
          quickFormat: true,
          run: {
            size: 20,
            bold: true,
            color: primaryColor,
            font: isMinimal() ? "Georgia" : "Arial",
          },
          paragraph: {
            spacing: { before: 240, after: 120 },
            border: {
              bottom: {
                color: "E5E7EB",
                space: 1,
                style: BorderStyle.SINGLE,
                size: 6,
              },
            },
          },
        },
        {
          id: "ContactInfo",
          name: "Contact Info",
          basedOn: "Normal",
          next: "Normal",
          quickFormat: true,
          run: {
            size: 18,
            color: "4B5563",
            font: isMinimal() ? "Georgia" : "Arial",
          },
          paragraph: {
            spacing: { after: 120 },
          },
        },
        {
          id: "NormalText",
          name: "Normal Text",
          basedOn: "Normal",
          next: "Normal",
          quickFormat: true,
          run: {
            size: 20,
            color: "1F2937",
            font: isMinimal() ? "Georgia" : "Arial",
          },
          paragraph: {
            spacing: { before: 40, after: 40 },
          },
        },
        {
          id: "SubHeading",
          name: "Sub Heading",
          basedOn: "Normal",
          next: "Normal",
          quickFormat: true,
          run: {
            size: 20,
            bold: true,
            color: accentColor,
            font: isMinimal() ? "Georgia" : "Arial",
          },
          paragraph: {
            spacing: { before: 40, after: 40 },
          },
        },
      ],
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1000,
              right: 1000,
              bottom: 1000,
              left: 1000,
            },
          },
        },
        children: children,
      },
    ],
  });

  function isMinimal() {
    return !isCreative && !isModern;
  }

  const blob = await Packer.toBlob(doc);
  return blob;
};
