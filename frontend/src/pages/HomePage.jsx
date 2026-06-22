import toast from "react-hot-toast";

function HomePage() {

  // with tanstack you can use querries to fetch data;

  return (
    <div>
      <button
        className="btn btn-primary"
        onClick={() =>
          toast.success("you have successfully clicked this button")
        }
      >Click here</button>
    </div>
  );
}

export default HomePage;
