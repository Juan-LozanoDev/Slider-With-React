import "./App.css";
import data from "./services/data";
import { useEffect, useState } from "react";

function App() {
    const [people, setPeople] = useState(data);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < 0) {
            setIndex(people.length - 1);
        }

        if (index > people.length - 1) {
            setIndex(0);
        }
    }, [index]);

    useEffect(() => {
        const startInterval = setInterval(() => {
            setIndex(index + 1);
        }, 5000);
        return () => {
            clearInterval(startInterval);
        };
    }, [index]);

    const handlePrevious = () => {
        setIndex(index - 1);
    };

    const handleNext = () => {
        setIndex(index + 1);
    };

    return (
        <section className="people-container">
            {people.map((person, personIndex) => {
                let position = "person nextSlide";
                if (personIndex === index) {
                    position = "person actualSlide";
                }

                if (personIndex === index - 1 || (index === 0 && personIndex === people.length - 1)) {
                    position = "person lastSlide";
                }

                return (
                    <article className={position} key={person.id}>
                        <img src={person.image} alt="Imagen de una persona" />
                        <h2 className="name">{person.name}</h2>
                        <h3 className="title">{person.title}</h3>
                        <p className="quote">{person.quote}</p>
                    </article>
                );
            })}

            <button className="prev" onClick={handlePrevious}>
                Previous
            </button>
            <button className="next" onClick={handleNext}>
                Next
            </button>
        </section>
    );
}

export default App;
