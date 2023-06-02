export class CreateAccountDto {
    userId!: string;
    companyName!: string;
    country!: string;
    provinceState!: string;
    city!: string;
    managerUserId?: string | null;
}
