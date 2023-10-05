export interface ITransformedFeedback extends IFeedbackInputDTO {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
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
