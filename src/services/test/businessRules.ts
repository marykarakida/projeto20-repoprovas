import * as testRepository from '../../repositories/testRepository';
import { CustomError } from '../../middlewares';

export async function ensurePdfUrlIsUnique(pdfUrl: string): Promise<void> {
    const test = await testRepository.findTestByPdfUrl(pdfUrl);

    if (test) {
        throw CustomError('error_conflict', 'This pdf already exists');
    }
}
