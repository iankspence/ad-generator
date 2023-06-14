export class UpdateAdStatusByAdSetIdDto {
    adSetId!: string;
    adStatus!: 'fresh' | 'pdf' | 'review' | 'approved' | 'delivered';
}
