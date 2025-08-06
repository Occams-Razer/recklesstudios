interface ServiceCardProps {
  title: string;
  description: string;
  isPopular?: boolean;
}

const ServiceCard = ({
  title,
  description,
  isPopular = false,
}: ServiceCardProps) => {
  return (
    <div className="w-[20vw] h-[20vh] rounded-[15px] bg-[#E93636] relative overflow-hidden">
      {/* Camera/Video Icon */}
      <svg
        className="w-[40%] h-[40%] fill-white absolute left-[35px] top-[30px] flex-shrink-0"
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M60 0C93.1371 0 120 26.8629 120 60C120 93.1371 93.1371 120 60 120C26.8629 120 0 93.1371 0 60C0 26.8629 26.8629 0 60 0ZM24 55.4424C21.2387 55.4424 19.0003 57.6812 19 60.4424V90C19 92.7614 21.2386 95 24 95H73.9209C76.6823 95 78.9209 92.7614 78.9209 90V60.4424C78.9206 57.6812 76.6822 55.4424 73.9209 55.4424H24ZM102 56.3965C102 55.6066 101.127 55.1284 100.461 55.5537L82.9004 66.7793C82.6129 66.9631 82.4385 67.2809 82.4385 67.6221V80.3535C82.4384 80.407 82.3953 80.4502 82.3418 80.4502C82.245 80.4504 82.2084 80.5767 82.29 80.6289L100.461 92.2441C101.127 92.6696 102 92.1914 102 91.4014V56.3965ZM63.1523 24C54.5981 24.0002 47.6631 30.935 47.6631 39.4893C47.6632 48.0434 54.5982 54.9784 63.1523 54.9785C71.7066 54.9785 78.6415 48.0435 78.6416 39.4893C78.6416 30.9349 71.7067 24 63.1523 24ZM32.543 28.8428C25.4144 28.8428 19.6358 34.6214 19.6357 41.75C19.6357 48.8786 25.4144 54.6572 32.543 54.6572C39.6716 54.6572 45.4502 48.8786 45.4502 41.75C45.4502 34.6214 39.6716 28.8428 32.543 28.8428Z"
          fill="white"
        />
      </svg>

      {/* Service Title */}
      <h2
        className="text-white font-bold text-[60px] leading-none absolute left-[35px] top-[160px] w-[410px] h-[65px] m-0"
        style={{
          fontFamily: "Archivo, -apple-system, Roboto, Helvetica, sans-serif",
        }}
      >
        {title}
      </h2>

      {/* Service Description */}
      <p
        className="w-[428px] text-white font-normal text-[10em] leading-none absolute left-[35px] top-[250px] h-[70px] m-0"
        style={{
          fontFamily: "Archivo, -apple-system, Roboto, Helvetica, sans-serif",
        }}
      >
        {description}
      </p>

      {/* Popular Badge */}
      {isPopular && (
        <div className="inline-flex items-center absolute left-[495px] top-0 w-[70px] h-[286px]">
          <div className="w-[285.812px] h-[70px] rotate-90 fill-white relative">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/555795722024204fa2c60bc743ba435f1ea53260?width=574"
              alt="Popular badge background"
              className="w-[287px] h-[70px] rotate-90 fill-[#D9D9D9] absolute left-0 top-0"
            />
            <div className="inline-flex rotate-90 pr-[40px] items-center gap-[15px] absolute left-[7px] top-[13px] w-[278px] h-[56px]">
              <span
                className="text-black font-normal text-[28px] leading-none"
                style={{
                  fontFamily:
                    "Archivo, -apple-system, Roboto, Helvetica, sans-serif",
                }}
              >
                Most Popular
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceCard;
