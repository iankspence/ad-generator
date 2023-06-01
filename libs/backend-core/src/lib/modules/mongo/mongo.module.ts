import { AccountModule } from './account/account.module';
import { AdSetModule } from './ad-set/ad-set.module';
import { AdModule } from './ad/ad.module';
import { BackgroundImageModule } from './background-image/background-image.module';
import { CityModule } from './city/city.module';
import { ClaimModule } from './claim/claim.module';
import { CloseModule } from './close/close.module';
import { CopyModule } from './copy/copy.module';
import { CountryModule } from './country/country.module';
import { HookModule } from './hook/hook.module';
import { MaskModule } from './mask/mask.module';
import { ProvinceStateModule } from './province-state/province-state.module';
import { ReviewModule } from './review/review.module';
import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';

@Module({
    imports: [
        UserModule,
        AccountModule,
        ReviewModule,
        ClaimModule,
        CopyModule,
        HookModule,
        CloseModule,
        MaskModule,
        BackgroundImageModule,
        AdModule,
        AdSetModule,
        CountryModule,
        ProvinceStateModule,
        CityModule,
    ],
})
export class MongoModule {}
