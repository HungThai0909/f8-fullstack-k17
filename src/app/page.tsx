import Button from "./_components/Button";
export default function HomePage() {
  console.log("HomePage");
  return (
    <div>
      <h1 className="text-3xl">Home</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor nesciunt
        asperiores corporis quod assumenda veniam dolores quibusdam eligendi,
        dolorem similique, ipsum minus distinctio tempore. Consectetur cumque
        magnam nostrum eius doloribus.
      </p>
      <Button initCount={10} />
    </div>
  );
}
