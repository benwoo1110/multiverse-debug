import { DynamicIcon, type IconName } from 'lucide-react/dynamic';

type Props = {
    icon: IconName;
    header: string;
}

export const IconHeader = ({ icon, header }: Props) => {
  return (
    <div className="flex text-wrapper items-center space-x-2 mb-2">
        <DynamicIcon size={20} name={icon} />
        <div className="text-lg font-medium">{header}</div>
    </div>
  );
};
