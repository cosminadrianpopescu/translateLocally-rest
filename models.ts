
export const TL_PATH = 'tl-path';

export class TranslationModel {
    shortName: string;
    fullName: string;
    id: string;
}

export class TranslationRequest {
    modelId: string;
    txt: string;
    isHtml: boolean;
}

export class TranslationResponse {
    modelId: string;
    txt: string;
}
