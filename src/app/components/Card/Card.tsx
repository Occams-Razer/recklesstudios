interface Props {
  title: string;
  description: string;
  icon: string;
  banner: string;
}

const Card = ({ title, description, icon }: Props) => {
  return (
    <>
      <div className="bg-[#e93636] pt-px-30 pl-px-35 text-white">
        <img src={icon}></img>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </>
  );
};

export default Card;
