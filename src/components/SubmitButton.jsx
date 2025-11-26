export default function SubmitButton({ name }) {
    return (
        <button type='submit' className="my-4 text-white px-4 py-2 w-fit bg-secondary rounded-xl 
      hover:bg-primary hover:border  hover:text-black">
            {name}
        </button>
    );
}