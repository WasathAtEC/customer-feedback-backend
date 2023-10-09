export interface ITransformedFeedback extends IFeedbackInputDTO {
  _id: string;
  __v: number;
}

export interface IFeedbackInputDTO {
  company: string;
  issueCategory: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  imageUrl: string;
  ticket: string;
}
