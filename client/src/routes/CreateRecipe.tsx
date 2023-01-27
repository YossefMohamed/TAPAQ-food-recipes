import React, {
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  LegacyRef,
  useRef,
  useState,
} from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsCameraFill } from "react-icons/bs";
import FormInput from "../components/form/FormInput";

const CreateRecipe = () => {
  const [title, setTitle] = useState("");

  const [tags, setTags] = useState<string[]>([]);
  const [tag, setTag] = useState("");
  const addTagToArray = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTags((prev) => [...prev, tag]);
    setError("");
    setTag("");
  };
  const [error, setError] = useState("");
  const onSubmitRecipe = () => {
    if (title.length < 3) return setError("You have to add valid title");
    if (tags.length === 0)
      return setError("You have add one tag to your recipe");
    if (ingrediants.length < 4)
      return setError("You have add more ingrediants to your recipe");
    if (steps.length < 4)
      return setError("You have add more steps to your recipe");
  };
  const [ingrediants, setIngrediants] = useState<string[]>([]);
  const [ingrediant, setIngrediant] = useState("");
  const addIngrediantToArray = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIngrediants((prev) => [...prev, ingrediant]);
    setIngrediant("");
    setError("");
  };
  const [steps, setSteps] = useState<string[]>([]);
  const [step, setStep] = useState("");
  const [image, setImage] = useState<any>();
  const onChangePicture = (e: any) => {
    if (e.target.files[0]) {
      console.log("picture: ", e.target.files);
      setImage(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImage(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const addStepToArray = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSteps((prev) => [...prev, step]);
    setStep("");
    setError("");
  };
  const ref = useRef<HTMLInputElement | null>(null);
  return (
    <div>
      <input
        type="file"
        className="hidden"
        ref={ref}
        onChange={onChangePicture}
      />
      <div
        className="image w-full bg-main h-[500px] rounded-t-2xl hover:opacity-75 relative cursor-pointer transition overflow-hidden"
        onClick={() => ref.current?.click()}
      >
        {image && <img src={image} className="w-full h-full object-cover" />}
        <span className="text-4xl absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-light">
          <BsCameraFill />
        </span>
      </div>
      <div className="title">Create new recipe</div>
      {error && <div className="alert">{error}</div>}
      <input
        placeholder="New recipe title here..."
        onChange={(e) => setTitle(e.target.value)}
        name="recipeName"
        type="text"
        value={title}
        className="text-4xl text-black w-full py-5 outline-none placeholder-tmuted font-bold"
      />
      <form className="flex items-center gap-2" onSubmit={addTagToArray}>
        {tags.length
          ? tags.map((tag, idx) => (
              <div
                key={idx}
                className="bg-gray-500 text-tsecondary p-2 px-3 rounded flex gap-4 items-center"
              >
                #{tag}
                <span
                  className="text-sm cursor-pointer"
                  onClick={() => {
                    setTags((tags) =>
                      tags.filter((currTag, indx) => indx !== idx)
                    );
                  }}
                >
                  <AiOutlineClose />
                </span>
              </div>
            ))
          : ""}
        <input
          placeholder={tags.length === 4 ? "" : "Add up to four tags"}
          onChange={(e) => setTag(e.target.value)}
          name="recipeName"
          type="text"
          value={tag}
          disabled={tags.length === 4}
          className="text-xl text-black w-full py-5 outline-none placeholder-tmuted font-bold"
        />
      </form>
      <div className="ingredients">
        <div className="title text-lg ">Add ingredients</div>
        <div className="flex flex-col gap-5">
          {" "}
          {ingrediants.length
            ? ingrediants.map((ingrediant, idx) => (
                <div className="item flex gap-1 items-center" key={idx}>
                  <div className="number border px-4 py-2  mr-4 rounded-[100%]">
                    {idx + 1}
                  </div>
                  {ingrediant}
                  <span
                    className="text-sm cursor-pointer ml-auto"
                    onClick={() => {
                      setIngrediants((ingrediants) =>
                        ingrediants.filter(
                          (currIgrediant, indx) => indx !== idx
                        )
                      );
                    }}
                  >
                    <AiOutlineClose />
                  </span>
                </div>
              ))
            : ""}
        </div>
        <form
          className="flex items-center gap-2"
          onSubmit={addIngrediantToArray}
        >
          <input
            placeholder={"Add you ingrediants"}
            onChange={(e) => setIngrediant(e.target.value)}
            name="recipeName"
            type="text"
            value={ingrediant}
            className="text-xl text-black w-full py-5 outline-none placeholder-tmuted font-bold"
          />
        </form>
      </div>

      <div className="steps">
        <div className="title text-lg ">Add Steps</div>

        <div className="items-container flex flex-col gap-10 border-l-4 translate-x-4">
          {" "}
          {steps.length
            ? steps.map((step, idx) => (
                <div className="item flex gap-1 items-center">
                  <div className="number border px-4 py-2  mr-4 rounded-[100%] -translate-x-6 bg-white">
                    {idx + 1}
                  </div>
                  {step}
                  <span
                    className="text-sm cursor-pointer ml-auto"
                    onClick={() => {
                      setSteps((steps) =>
                        steps.filter((currStep, indx) => indx !== idx)
                      );
                    }}
                  >
                    <AiOutlineClose />
                  </span>
                </div>
              ))
            : ""}
        </div>
        <form className="flex items-center gap-2" onSubmit={addStepToArray}>
          <input
            placeholder={"Add you Steps"}
            onChange={(e) => setStep(e.target.value)}
            name="recipeName"
            type="text"
            value={step}
            className="text-xl text-black w-full py-5 outline-none placeholder-tmuted font-bold"
          />
        </form>
      </div>
      <button className="btn-primary my-10" onClick={onSubmitRecipe}>
        Submit your Recipe 😊
      </button>
    </div>
  );
};

export default CreateRecipe;