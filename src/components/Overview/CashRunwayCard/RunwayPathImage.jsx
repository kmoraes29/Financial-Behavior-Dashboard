export const RunwayPathImage = ({ image }) => {
  return (
    <img
      src={image}
      alt="Caminho representando horizonte de caixa"
      className="
        relative
        z-0
        h-[70%]
        w-full
        object-contain
        opacity-90

        md:absolute
        md:right-8
        md:top-[-20px]
        md:mt-14
        md:h-auto
        md:w-[75%]

        lg:right-12
        lg:top-[-50px]
        lg:w-[68%]

        xl:right-16
        xl:top-[-80px]
        xl:w-[75%]
      "
    />
  );
};