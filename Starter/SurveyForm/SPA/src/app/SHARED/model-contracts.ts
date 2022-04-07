export interface IQuestionaireForm
{
    userId: number,
    firstName: string,
    lastName: string,
    fullName: string,
    email: string,
    venueId: number,
    venue: IVenue,
    venueLookupList: IVenue[],
    isCompliant: boolean,
    questionsAndAnswers: IQuestionsAndAnswer[],
    dateCreated: Date
}

export interface IQuestionsAndAnswer{

    questionId: number,
    question: string,
    isTrue: boolean
}

export interface IVenue{
    id: number,
    name: string
}

export interface IRole{
    id: number,
    name: string,
    longName: string,
    shortName: string,
    code: string, 
    isActive: boolean,
    tempId: string // generated client side
}

export interface IUser{
    id: number;
    email: string;
    userName: string;
    firstName: string;
    lastName: string;
    fullName: string;
    createdUserId: number;
    createdDate: Date;
    modifiedUserId: number;
    modifiedDate: Date;
    isActive: boolean;
    isB2C: boolean;
    lastLogin: Date;
    roles: IRole[];
    departments: IDepartment[]
}

export interface IRole {
    id: number;
    name: string;
    systemName: string,
    isActive: boolean;
}

export interface IDepartment
{
    id: number,
    name: string,
    code: string,
    isActive: boolean
}