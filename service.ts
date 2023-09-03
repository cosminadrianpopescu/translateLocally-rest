import { spawn } from "child_process";
import { unlinkSync, writeFileSync } from "fs";
import { Autowired, Service } from "tsdim";
import { TL_PATH, TranslationModel, TranslationRequest, TranslationResponse } from "./models";

@Service()
export class TranslateService {
    @Autowired(TL_PATH) private _path: string;
    private _id = 0;

    private async _run(params: Array<string>): Promise<string> {
        const proc = spawn(this._path, params);
        if (!proc) {
            throw 'translateLocally could not be launched';
        }

        return new Promise(resolve => {
            let result = '';
            let err = '';
            proc.stdout.on('data', data => result += data.toString());
            proc.stderr.on('data', data => err += data.toString());
            proc.on('exit', code => resolve(code == 0 ? result : err));
        });
    }

    private _toModel(s: string): TranslationModel {
        return <TranslationModel>{
            shortName: s.replace(/^([^ ]+).*$/gi, '$1'),
            fullName: s.replace(/^([^;]+).*$/gi, '$1'),
            id: s.replace(/^.* ([^ ]+)$/, '$1'),
        }
    }

    private _dataToModels(s: string): Array<TranslationModel> {
        return s.split(/[\r\n]/gi).filter(s => !!s).map(this._toModel);
    }

    public async installedModels(): Promise<Array<TranslationModel>> {
        return this._dataToModels(await this._run(['-l']));
    }

    public async availableModels(): Promise<Array<TranslationModel>> {
        return this._dataToModels(await this._run(['-a']));
    }

    public async translate(request: TranslationRequest): Promise<TranslationResponse> {
        const file = `/tmp/translate-${process.pid}-${this._id++}`;
        writeFileSync(file, request.txt);
        const params = ['-m', request.modelId, '-i', file];
        if (request.isHtml) {
            params.push('--html')
        }
        const result = await this._run(params);
        unlinkSync(file);
        return <TranslationResponse>{modelId: request.modelId, txt: result};
    }
}
