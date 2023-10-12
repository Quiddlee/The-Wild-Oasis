export interface IOption<TValues extends string> {
  value: TValues;
  label: string;
}

export interface IOptions<TOptionValues extends string> {
  options: IOption<TOptionValues>[];
}
