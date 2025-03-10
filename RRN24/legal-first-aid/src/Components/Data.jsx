const legalQuestions = [
    {
      id: 1,
      question: "What are my rights if I get arrested in Cameroon?",
      askedBy: "JohnDoe",
      responses: [
        { id: 1, answer: "You have the right to remain silent and request a lawyer.", answeredBy: "LawyerA", lawType: "Common Law" },
        { id: 2, answer: "The police must inform you of the charges against you.", answeredBy: "LawyerB", lawType: "Civil Law" },
        { id: 3, answer: "You must be presented before a judge within a reasonable time.", answeredBy: "LawyerC", lawType: "Common Law" },
        { id: 4, answer: "If detained beyond 48 hours, a judge must authorize the detention.", answeredBy: "LawyerD", lawType: "Civil Law" },
        { id: 5, answer: "You can request bail unless charged with a serious crime.", answeredBy: "LawyerE", lawType: "Common Law" }
      ]
    },
    {
      id: 2,
      question: "How can I legally evict a tenant?",
      askedBy: "JaneSmith",
      responses: [
        { id: 1, answer: "Provide a formal notice as per the lease agreement.", answeredBy: "LawyerF", lawType: "Common Law" },
        { id: 2, answer: "If the tenant refuses to leave, file for eviction through the courts.", answeredBy: "LawyerG", lawType: "Civil Law" },
        { id: 3, answer: "Non-payment of rent is a valid reason for eviction.", answeredBy: "LawyerH", lawType: "Common Law" },
        { id: 4, answer: "Ensure the eviction follows the procedures outlined in tenancy laws.", answeredBy: "LawyerI", lawType: "Civil Law" },
        { id: 5, answer: "Never use forceful means to evict a tenant; always go through legal channels.", answeredBy: "LawyerJ", lawType: "Common Law" }
      ]
    },
    {
      id: 3,
      question: "What legal steps should I take after a car accident?",
      askedBy: "AlexM",
      responses: [
        { id: 1, answer: "Call emergency services and seek medical help if needed.", answeredBy: "LawyerK", lawType: "Common Law" },
        { id: 2, answer: "Exchange contact and insurance details with the other driver.", answeredBy: "LawyerL", lawType: "Civil Law" },
        { id: 3, answer: "Report the accident to the police immediately.", answeredBy: "LawyerM", lawType: "Common Law" },
        { id: 4, answer: "Gather evidence like photos and witness statements.", answeredBy: "LawyerN", lawType: "Civil Law" },
        { id: 5, answer: "Inform your insurance company as soon as possible.", answeredBy: "LawyerO", lawType: "Common Law" }
      ]
    },
    {
      id: 4,
      question: "How do I report domestic violence legally?",
      askedBy: "MaryT",
      responses: [
        { id: 1, answer: "Call the police or a domestic violence hotline for immediate help.", answeredBy: "LawyerP", lawType: "Common Law" },
        { id: 2, answer: "File a complaint at the nearest police station.", answeredBy: "LawyerQ", lawType: "Civil Law" },
        { id: 3, answer: "Seek a protection order from the court.", answeredBy: "LawyerR", lawType: "Common Law" },
        { id: 4, answer: "Gather medical records and evidence of abuse.", answeredBy: "LawyerS", lawType: "Civil Law" },
        { id: 5, answer: "Consult a lawyer or legal aid group for further action.", answeredBy: "LawyerT", lawType: "Common Law" }
      ]
    },
    {
      id: 5,
      question: "What are the legal requirements for marriage in Cameroon?",
      askedBy: "RichardX",
      responses: [
        { id: 1, answer: "Both parties must be at least 18 years old.", answeredBy: "LawyerU", lawType: "Common Law" },
        { id: 2, answer: "A marriage must be registered at the civil status registry.", answeredBy: "LawyerV", lawType: "Civil Law" },
        { id: 3, answer: "A public announcement of the marriage must be made.", answeredBy: "LawyerW", lawType: "Common Law" },
        { id: 4, answer: "Both partners must consent freely to the marriage.", answeredBy: "LawyerX", lawType: "Civil Law" },
        { id: 5, answer: "Bigamy is illegal unless in communities where polygamy is permitted.", answeredBy: "LawyerY", lawType: "Common Law" }
      ]
    }
  ];
  
  
  
  export default legalQuestions;
  