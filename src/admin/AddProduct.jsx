import React, { useState } from "react";
import { Col, Container, Form, FormGroup } from "reactstrap";
import { toast } from "react-toastify";
import { db, storage } from "firebase.config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("chair");
  const [price, setPrice] = useState("");
  const [imgUrl, setImgUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const addProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    // ==== add product to the firebase database ======

    try {
      //add key to the firestore Database
      const docRef = await collection(db, "products");

      //create name folder and value to the Storage
      const storageRef = ref(
        storage,
        `images-product/${Date.now() + "--" + imgUrl.name}`
      );

      const uploadTask = uploadBytesResumable(storageRef, imgUrl);

      uploadTask.on(
        "state_changed",
        () => {},
        () => {
          toast.error("images not uploaded!");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
            await addDoc(docRef, {
              title,
              shortDesc,
              description,
              category,
              price,
              imgUrl: url,
            });
          });
        }
      );
      setLoading(false);
      toast.success("product successfully added!");
      navigate("/dashboard/all-products");
    } catch (err) {
      setLoading(false);
      toast.error("product not added!");
    }
  };

  return (
    <section>
      <Container>
        <Col lg="12">
          {loading ? (
            <h4 className="py-5">Loading.....</h4>
          ) : (
            <>
              <h4 className="mb-5">Add Product</h4>
              <Form onSubmit={addProduct}>
                <FormGroup className="form__group">
                  <span>Product title</span>
                  <input
                    type="text"
                    placeholder="Double sofa"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </FormGroup>

                <FormGroup className="form__group">
                  <span>Short Description</span>
                  <input
                    type="text"
                    placeholder="lorem....."
                    value={shortDesc}
                    onChange={(e) => setShortDesc(e.target.value)}
                    required
                  />
                </FormGroup>

                <FormGroup className="form__group">
                  <span>Description</span>
                  <input
                    type="text"
                    placeholder="Description....."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </FormGroup>

                <div className="d-flex align-items-center justify-content-between gap-5">
                  <FormGroup className="form__group w-50">
                    <span>Price</span>
                    <input
                      type="number"
                      placeholder="$100"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup className="form__group w-50">
                    <span>Category</span>
                    <select
                      className="w-100 p-2"
                      value={category}
                      onChange={(e) => {
                        setCategory(e.target.value)
                      }}
                    >
                      <option value="chair">Chair</option>
                      <option value="sofa">Sofa</option>
                      <option value="mobile">Mobile</option>
                      <option value="watch">Watch</option>
                      <option value="wireless">Wireless</option>
                    </select>
                  </FormGroup>
                </div>

                <div>
                  <FormGroup className="form__group">
                    <span>Product Image</span>
                    <input
                      type="file"
                      onChange={(e) => setImgUrl(e.target.files[0])}
                      required
                    />
                  </FormGroup>
                </div>

                <button className="buy__btn" type="submit">
                  Add Product
                </button>
              </Form>
              {/* <p>{percent} "% done"</p> */}
            </>
          )}
        </Col>
      </Container>
    </section>
  );
};

export default AddProduct;
