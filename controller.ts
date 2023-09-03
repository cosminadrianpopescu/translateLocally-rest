import { ApiController, Async, Controller, HttpGet, HttpPost } from "dinoloop";
import { Autowired, Service } from "tsdim";
import { TranslationModel, TranslationRequest, TranslationResponse } from "./models";
import { TranslateService } from "./service";

@Controller('')
@Service()
export class TranslatorController extends ApiController {
    @Autowired(TranslateService) private _tr: TranslateService;

    private _checkLogin() {
        if (!process.env['TL_TOKEN']) {
            return ;
        }

        if (this.request.headers['x-tl-token'] != process.env['TL_TOKEN']) {
            throw 'NOT_LOGGED_IN';
        }
    }

    @Async()
    @HttpGet('/installed-models')
    public installedModels(): Promise<Array<TranslationModel>> {
        this._checkLogin();
        return this._tr.installedModels();
    }

    @Async()
    @HttpGet('/available-models')
    public availableModels(): Promise<Array<TranslationModel>> {
        this._checkLogin();
        return this._tr.availableModels();
    }

    @Async()
    @HttpPost('/translate')
    public translate(body: TranslationRequest): Promise<TranslationResponse> {
        this._checkLogin();
        return this._tr.translate(body);
    }
}
