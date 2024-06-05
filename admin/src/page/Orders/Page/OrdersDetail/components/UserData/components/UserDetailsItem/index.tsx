interface UserDetailsProps {
  label: string;
  value: string | undefined;
}

export const UserDetailsItem: React.FC<UserDetailsProps> = ({
  label,
  value,
}) => (
  <div style={{ display: "flex", marginTop: "4px" }}>
    <div style={{ fontWeight: "bold", marginRight: "4px" }}>{label}:</div>
    {value}
  </div>
);
