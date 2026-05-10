import { RoundedCell } from './rounded-cell';

type ThisProps = {
    title: string;
    value?: string;
}

export const KeyValueCell = ({ title, value }: ThisProps) => {
  return (
    <RoundedCell>
      <p className="font-medium">{title}</p>
      {value ? <p className="text-muted-foreground">{value}</p> : <p className="text-muted-foreground italic">unknown</p>}
    </RoundedCell>
  );
};
