import { QuestionItem } from "../store/useExamStore";

export const SAMPLE_CGL_MOCK_TEST = {
  id: "cgl-tier1-mock-2026",
  title: "SSC CGL 2026 Tier-I Full Length Mock Test #01",
  durationSeconds: 3600, // 60 minutes
  totalMarks: 200,
  totalQuestions: 20, // Sample 20 rich questions across 4 sections
  sections: [
    "General Intelligence & Reasoning",
    "General Awareness",
    "Quantitative Aptitude",
    "English Comprehension",
  ],
  questions: [
    // Section 1: General Intelligence & Reasoning
    {
      id: "q1",
      sectionName: "General Intelligence & Reasoning",
      orderIndex: 1,
      content: {
        en: {
          question: "Select the option that is related to the third word in the same way as the second word is related to the first word:\n\n**Ophthalmologist : Eye :: Nephrologist : ?**",
          options: [
            { id: "opt1", text: "Heart" },
            { id: "opt2", text: "Kidney" },
            { id: "opt3", text: "Brain" },
            { id: "opt4", text: "Lungs" },
          ],
          explanation: "An Ophthalmologist specializes in the treatment of eyes. Similarly, a Nephrologist specializes in the study and treatment of Kidneys.",
        },
        hi: {
          question: "उस विकल्प का चयन करें जो तीसरे शब्द से उसी प्रकार संबंधित है जैसे दूसरा शब्द पहले शब्द से संबंधित है:\n\n**नेत्र रोग विशेषज्ञ : आँख :: नेफ्रोलॉजिस्ट : ?**",
          options: [
            { id: "opt1", text: "हृदय" },
            { id: "opt2", text: "गुर्दा (किडनी)" },
            { id: "opt3", text: "मस्तिष्क" },
            { id: "opt4", text: "फेफड़े" },
          ],
          explanation: "नेत्र रोग विशेषज्ञ आँख से संबंधित विकारों का उपचार करता है। उसी प्रकार नेफ्रोलॉजिस्ट गुर्दे (किडनी) का उपचार करता है।",
        },
      },
      correctOptionId: "opt2",
      scoring: { positive: 2.0, negative: -0.5 },
      metadata: { subject: "Reasoning", topic: "Analogy", difficulty: "Easy" },
    },
    {
      id: "q2",
      sectionName: "General Intelligence & Reasoning",
      orderIndex: 2,
      content: {
        en: {
          question: "Find the missing number in the given series:\n\n$7, 14, 42, 210, 1680, ?$",
          options: [
            { id: "opt1", text: "16800" },
            { id: "opt2", text: "18480" },
            { id: "opt3", text: "15120" },
            { id: "opt4", text: "20160" },
          ],
          explanation: "The pattern is: $7 \\times 2 = 14$, $14 \\times 3 = 42$, $42 \\times 5 = 210$, $210 \\times 8 = 1680$, $1680 \\times 12 = 20160$. The multipliers increase by 1, 2, 3, 4: $(+1, +2, +3, +4)$. Hence $1680 \\times 12 = 20160$.",
        },
        hi: {
          question: "दी गई श्रृंखला में लुप्त संख्या ज्ञात कीजिए:\n\n$7, 14, 42, 210, 1680, ?$",
          options: [
            { id: "opt1", text: "16800" },
            { id: "opt2", text: "18480" },
            { id: "opt3", text: "15120" },
            { id: "opt4", text: "20160" },
          ],
          explanation: "पैटर्न: $7 \\times 2 = 14$, $14 \\times 3 = 42$, $42 \\times 5 = 210$, $210 \\times 8 = 1680$, $1680 \\times 12 = 20160$।",
        },
      },
      correctOptionId: "opt4",
      scoring: { positive: 2.0, negative: -0.5 },
      metadata: { subject: "Reasoning", topic: "Number Series", difficulty: "Medium" },
    },
    {
      id: "q3",
      sectionName: "General Intelligence & Reasoning",
      orderIndex: 3,
      content: {
        en: {
          question: "In a certain code language, if **'MASTER'** is written as **'OCUVGT'**, how will **'DOCTOR'** be written in that code?",
          options: [
            { id: "opt1", text: "FQEVQT" },
            { id: "opt2", text: "FQEWSU" },
            { id: "opt3", text: "FQEVRT" },
            { id: "opt4", text: "EPEUPS" },
          ],
          explanation: "Each letter is shifted forward by $+2$ positions:\n$M+2=O, A+2=C, S+2=U, T+2=V, E+2=G, R+2=T$.\nSimilarly for DOCTOR:\n$D+2=F, O+2=Q, C+2=E, T+2=V, O+2=Q, R+2=T \\Rightarrow$ **FQEVQT**.",
        },
        hi: {
          question: "एक निश्चित कूट भाषा में यदि **'MASTER'** को **'OCUVGT'** लिखा जाता है, तो उसी कूट भाषा में **'DOCTOR'** को कैसे लिखा जाएगा?",
          options: [
            { id: "opt1", text: "FQEVQT" },
            { id: "opt2", text: "FQEWSU" },
            { id: "opt3", text: "FQEVRT" },
            { id: "opt4", text: "EPEUPS" },
          ],
          explanation: "प्रत्येक वर्ण में $+2$ की वृद्धि की गई है: $D(+2)=F, O(+2)=Q, C(+2)=E, T(+2)=V, O(+2)=Q, R(+2)=T \\Rightarrow$ FQEVQT।",
        },
      },
      correctOptionId: "opt1",
      scoring: { positive: 2.0, negative: -0.5 },
      metadata: { subject: "Reasoning", topic: "Coding Decoding", difficulty: "Easy" },
    },

    // Section 2: General Awareness
    {
      id: "q4",
      sectionName: "General Awareness",
      orderIndex: 4,
      content: {
        en: {
          question: "Which Constitutional Amendment Act introduced the **Goods and Services Tax (GST)** in India?",
          options: [
            { id: "opt1", text: "99th Constitutional Amendment Act" },
            { id: "opt2", text: "100th Constitutional Amendment Act" },
            { id: "opt3", text: "101st Constitutional Amendment Act" },
            { id: "opt4", text: "103rd Constitutional Amendment Act" },
          ],
          explanation: "The 101st Constitutional Amendment Act, 2016 introduced the Goods and Services Tax (GST) in India with effect from 1st July 2017.",
        },
        hi: {
          question: "किस संविधान संशोधन अधिनियम द्वारा भारत में **वस्तु एवं सेवा कर (GST)** लागू किया गया था?",
          options: [
            { id: "opt1", text: "99वां संविधान संशोधन अधिनियम" },
            { id: "opt2", text: "100वां संविधान संशोधन अधिनियम" },
            { id: "opt3", text: "101वां संविधान संशोधन अधिनियम" },
            { id: "opt4", text: "103वां संविधान संशोधन अधिनियम" },
          ],
          explanation: "101वां संविधान संशोधन अधिनियम, 2016 द्वारा भारत में 1 जुलाई 2017 से GST लागू किया गया था।",
        },
      },
      correctOptionId: "opt3",
      scoring: { positive: 2.0, negative: -0.5 },
      metadata: { subject: "Polity", topic: "Constitutional Amendments", difficulty: "Easy" },
    },
    {
      id: "q5",
      sectionName: "General Awareness",
      orderIndex: 5,
      content: {
        en: {
          question: "Which of the following mountain passes connects **Srinagar with Leh**?",
          options: [
            { id: "opt1", text: "Zoji La Pass" },
            { id: "opt2", text: "Nathu La Pass" },
            { id: "opt3", text: "Shipki La Pass" },
            { id: "opt4", text: "Bara-lacha La Pass" },
          ],
          explanation: "Zoji La Pass is located in the Greater Himalayas in the Union Territory of Ladakh and connects Srinagar with Kargil and Leh on NH-1.",
        },
        hi: {
          question: "निम्नलिखित में से कौन सा दर्रा **श्रीनगर को लेह** से जोड़ता है?",
          options: [
            { id: "opt1", text: "ज़ोजिला दर्रा" },
            { id: "opt2", text: "नाथू ला दर्रा" },
            { id: "opt3", text: "शिपकी ला दर्रा" },
            { id: "opt4", text: "बारालाचा ला दर्रा" },
          ],
          explanation: "ज़ोजिला दर्रा श्रीनगर को करगिल और लेह से जोड़ता है। यह राष्ट्रीय राजमार्ग 1 पर स्थित है।",
        },
      },
      correctOptionId: "opt1",
      scoring: { positive: 2.0, negative: -0.5 },
      metadata: { subject: "Geography", topic: "Mountain Passes", difficulty: "Medium" },
    },

    // Section 3: Quantitative Aptitude (with rich KaTeX math)
    {
      id: "q6",
      sectionName: "Quantitative Aptitude",
      orderIndex: 6,
      content: {
        en: {
          question: "If $x + \\frac{1}{x} = 5$, find the exact value of the expression:\n\n$$x^3 + \\frac{1}{x^3}$$",
          options: [
            { id: "opt1", text: "110" },
            { id: "opt2", text: "125" },
            { id: "opt3", text: "140" },
            { id: "opt4", text: "115" },
          ],
          explanation: "Using algebraic identity:\n$$x^3 + \\frac{1}{x^3} = \\left(x + \\frac{1}{x}\\right)^3 - 3\\left(x + \\frac{1}{x}\\right)$$\n$$= 5^3 - 3(5) = 125 - 15 = 110$$",
        },
        hi: {
          question: "यदि $x + \\frac{1}{x} = 5$ है, तो व्यंजक का मान ज्ञात कीजिए:\n\n$$x^3 + \\frac{1}{x^3}$$",
          options: [
            { id: "opt1", text: "110" },
            { id: "opt2", text: "125" },
            { id: "opt3", text: "140" },
            { id: "opt4", text: "115" },
          ],
          explanation: "सर्वसमिका सूत्र से:\n$$x^3 + \\frac{1}{x^3} = 5^3 - 3(5) = 125 - 15 = 110$$",
        },
      },
      correctOptionId: "opt1",
      scoring: { positive: 2.0, negative: -0.5 },
      metadata: { subject: "Mathematics", topic: "Algebra", difficulty: "Easy" },
    },
    {
      id: "q7",
      sectionName: "Quantitative Aptitude",
      orderIndex: 7,
      content: {
        en: {
          question: "A shopkeeper marks an article $40\\%$ above its cost price and allows a discount of $25\\%$ on the marked price. If he sells it for ₹$840$, what was the cost price of the article?",
          options: [
            { id: "opt1", text: "₹750" },
            { id: "opt2", text: "₹800" },
            { id: "opt3", text: "₹700" },
            { id: "opt4", text: "₹820" },
          ],
          explanation: "Let Cost Price $= CP$.\nMarked Price $MP = 1.40 \\times CP$.\nSelling Price $SP = MP \\times (1 - 0.25) = 1.40 \\times CP \\times 0.75 = 1.05 \\times CP$.\nGiven $SP = 840$.\n$$CP = \\frac{840}{1.05} = ₹800$$.",
        },
        hi: {
          question: "एक दुकानदार किसी वस्तु पर उसके क्रय मूल्य से $40\\%$ अधिक अंकित करता है और अंकित मूल्य पर $25\\%$ की छूट देता है। यदि वह इसे ₹$840$ में बेचता है, तो वस्तु का क्रय मूल्य क्या था?",
          options: [
            { id: "opt1", text: "₹750" },
            { id: "opt2", text: "₹800" },
            { id: "opt3", text: "₹700" },
            { id: "opt4", text: "₹820" },
          ],
          explanation: "माना क्रय मूल्य $= CP$\nअंकित मूल्य $= 1.40 CP$\nविक्रय मूल्य $= 1.40 \\times 0.75 CP = 1.05 CP = 840$\n$$CP = \\frac{840}{1.05} = ₹800$$",
        },
      },
      correctOptionId: "opt2",
      scoring: { positive: 2.0, negative: -0.5 },
      metadata: { subject: "Mathematics", topic: "Profit & Loss", difficulty: "Medium" },
    },
    {
      id: "q8",
      sectionName: "Quantitative Aptitude",
      orderIndex: 8,
      content: {
        en: {
          question: "Evaluate the trigonometric expression:\n\n$$\\frac{\\sin 30^\\circ + \\tan 45^\\circ - \\csc 60^\\circ}{\\sec 30^\\circ + \\cos 60^\\circ + \\cot 45^\\circ}$$",
          options: [
            { id: "opt1", text: "$\\frac{43 - 24\\sqrt{3}}{11}$" },
            { id: "opt2", text: "$\\frac{3\\sqrt{3} - 4}{3\\sqrt{3} + 4}$" },
            { id: "opt3", text: "$\\frac{43 + 24\\sqrt{3}}{11}$" },
            { id: "opt4", text: "$\\frac{2\\sqrt{3} - 1}{2\\sqrt{3} + 1}$" },
          ],
          explanation: "Substitute values:\n$\\sin 30^\\circ = 1/2, \\tan 45^\\circ = 1, \\csc 60^\\circ = 2/\\sqrt{3}$\nNumerator $= 1/2 + 1 - 2/\\sqrt{3} = \\frac{3\\sqrt{3} - 4}{2\\sqrt{3}}$\nDenominator $= 2/\\sqrt{3} + 1/2 + 1 = \\frac{3\\sqrt{3} + 4}{2\\sqrt{3}}$\n$$\\text{Value} = \\frac{3\\sqrt{3}-4}{3\\sqrt{3}+4} = \\frac{(3\\sqrt{3}-4)^2}{(3\\sqrt{3})^2 - 4^2} = \\frac{27 + 16 - 24\\sqrt{3}}{27 - 16} = \\frac{43 - 24\\sqrt{3}}{11}$$",
        },
        hi: {
          question: "त्रिकोणमितीय व्यंजक का मान ज्ञात कीजिए:\n\n$$\\frac{\\sin 30^\\circ + \\tan 45^\\circ - \\csc 60^\\circ}{\\sec 30^\\circ + \\cos 60^\\circ + \\cot 45^\\circ}$$",
          options: [
            { id: "opt1", text: "$\\frac{43 - 24\\sqrt{3}}{11}$" },
            { id: "opt2", text: "$\\frac{3\\sqrt{3} - 4}{3\\sqrt{3} + 4}$" },
            { id: "opt3", text: "$\\frac{43 + 24\\sqrt{3}}{11}$" },
            { id: "opt4", text: "$\\frac{2\\sqrt{3} - 1}{2\\sqrt{3} + 1}$" },
          ],
          explanation: "त्रिकोणमितीय मानों को प्रतिस्थापित और परिमेयकरण करने पर उत्तर $\\frac{43 - 24\\sqrt{3}}{11}$ प्राप्त होता है।",
        },
      },
      correctOptionId: "opt1",
      scoring: { positive: 2.0, negative: -0.5 },
      metadata: { subject: "Mathematics", topic: "Trigonometry", difficulty: "Hard" },
    },

    // Section 4: English Comprehension
    {
      id: "q9",
      sectionName: "English Comprehension",
      orderIndex: 9,
      content: {
        en: {
          question: "Select the most appropriate **SYNONYM** of the given word:\n\n**METICULOUS**",
          options: [
            { id: "opt1", text: "Careless" },
            { id: "opt2", text: "Painstaking" },
            { id: "opt3", text: "Hasty" },
            { id: "opt4", text: "Indifferent" },
          ],
          explanation: "'Meticulous' means showing great attention to detail; very careful and precise. 'Painstaking' is its exact synonym.",
        },
        hi: {
          question: "दिए गए शब्द का सबसे उपयुक्त **समानार्थी (SYNONYM)** चुनें:\n\n**METICULOUS (अति सावधान/सूक्ष्म)**",
          options: [
            { id: "opt1", text: "Careless (लापरवाह)" },
            { id: "opt2", text: "Painstaking (कठिन परिश्रमी/सतर्क)" },
            { id: "opt3", text: "Hasty (जल्दबाज)" },
            { id: "opt4", text: "Indifferent (उदासीन)" },
          ],
          explanation: "Meticulous का अर्थ है किसी काम को बहुत सावधानी और बारीकी से करने वाला, जिसका सही समानार्थी Painstaking है।",
        },
      },
      correctOptionId: "opt2",
      scoring: { positive: 2.0, negative: -0.5 },
      metadata: { subject: "English", topic: "Vocabulary", difficulty: "Medium" },
    },
    {
      id: "q10",
      sectionName: "English Comprehension",
      orderIndex: 10,
      content: {
        en: {
          question: "Select the option that rectifies the underlined idiom correctly:\n\n\"The manager told the newly hired staff to **burn the midnight lamp** to finish the project on time.\"",
          options: [
            { id: "opt1", text: "burn the midnight fuel" },
            { id: "opt2", text: "burn the midnight oil" },
            { id: "opt3", text: "burn the candle from middle" },
            { id: "opt4", text: "light the midnight torch" },
          ],
          explanation: "The correct English idiom is 'burn the midnight oil', which means to work or study late into the night.",
        },
        hi: {
          question: "सही मुहावरे (Idiom) वाले विकल्प का चयन करें:\n\n\"The manager told the newly hired staff to **burn the midnight lamp** to finish the project on time.\"",
          options: [
            { id: "opt1", text: "burn the midnight fuel" },
            { id: "opt2", text: "burn the midnight oil" },
            { id: "opt3", text: "burn the candle from middle" },
            { id: "opt4", text: "light the midnight torch" },
          ],
          explanation: "सही मुहावरा **'burn the midnight oil'** होता है, जिसका अर्थ है देर रात तक कड़ी मेहनत करना।",
        },
      },
      correctOptionId: "opt2",
      scoring: { positive: 2.0, negative: -0.5 },
      metadata: { subject: "English", topic: "Idioms & Phrases", difficulty: "Easy" },
    },
  ] as QuestionItem[],
};
