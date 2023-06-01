export class RegisterUserDto {
    readonly companyName!: string;
    readonly email!: string;
    readonly password!: string;
    readonly roles?: string[];

    readonly country!: string;
    readonly provinceState!: string;
    readonly city!: string;
}
