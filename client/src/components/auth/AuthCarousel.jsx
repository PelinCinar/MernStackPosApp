import PropTypes from "prop-types";
const AuthCarousel = ({ img, title, desc }) => {
  return (
    <div className="!flex flex-col items-center justify-center h-full mb-10 ">
      <div className="w-[600px] h-[500px] p-2 border-4 border-[#cdb69a] rounded-3xl shadow-lg">
        <img
          src={img}
          alt=""
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
      <h3 className="text-4xl text-white text-center pt-6 ">{title}</h3>
      <p className="mt-5 text-2xl text-white text-center">{desc}</p>
    </div>
  );
};
AuthCarousel.propTypes = {
  img: PropTypes.bool.isRequired,
  title: PropTypes.func.isRequired,
  desc: PropTypes.func.isRequired,
};
export default AuthCarousel;
