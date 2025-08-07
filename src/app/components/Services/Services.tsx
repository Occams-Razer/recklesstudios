import styles from "./services.module.css";

const Services = () => {
  return (
    <div className={styles.main} id="services">
      <h2 className={styles.header}>{"let's make something great."} </h2>
      <div className={styles.contact}>
        <p>phone: (608) 370-0493</p>
        <p>
          email:{" "}
          <a href="mailto:reckllessstudios@gmail.com">
            reckllessstudios@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default Services;
