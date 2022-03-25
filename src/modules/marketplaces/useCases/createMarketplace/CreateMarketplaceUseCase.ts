import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../../accounts/repositories/IUsersRepository";
import { ICreateMarketPlaceDTO } from "../../dto/ICreateMarketplaceDTO";
import { IMarketplacesRepository } from "../../repositories/IMarketplacesRepository";

@injectable()
class CreateMarketplaceUseCase {
    constructor(
        @inject("MarketplacesRepository")
        private marketplacesRepository: IMarketplacesRepository,
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async execute({ name, user_id }: ICreateMarketPlaceDTO): Promise<void> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError("User not found");
        }

        await this.marketplacesRepository.create({ name, user_id });
    }
}

export { CreateMarketplaceUseCase };
