import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const BASE_URL = "https://gos-testing.tantra-gyan.com/wp-json/wc/v3";

const KEY = "ck_bcde0446325fb4b146e2607ecc23f0cab1cfc5ef";
const SECRET = "cs_c336466917442d6c696a5f3f26cdc32635f9e0d0";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    category: "",
    min_price: "",
    max_price: "",
    orderby: "",
    order: "asc",
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const params = {
        consumer_key: KEY,
        consumer_secret: SECRET,
        per_page: 20,
      };

      // only add filters if they exist
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params[key] = value;
      });

      const res = await axios.get(`${BASE_URL}/products`, { params });
      setProducts(res.data);
    } catch (error) {
      console.error("❌ Product fetch error:", error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/products/categories`,
        {
          params: {
            consumer_key: KEY,
            consumer_secret: SECRET,
            per_page: 50,
          },
        }
      );
      setCategories(res.data);
    } catch (error) {
      console.error("❌ Category fetch error:", error.response?.data || error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  return (
    <div className="flex gap-8 p-8">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white rounded-xl shadow p-5 space-y-6">
        {/* CATEGORY */}
        <div>
          <h3 className="font-semibold mb-2">Categories</h3>
          <select
            className="w-full border p-2 rounded"
            onChange={(e) =>
              setFilters({ ...filters, category: e.target.value })
            }
          >
            <option value="">All</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* PRICE */}
        <div>
          <h3 className="font-semibold mb-2">Price</h3>
          <input
            type="number"
            placeholder="Min"
            className="w-full border p-2 rounded mb-2"
            onChange={(e) =>
              setFilters({ ...filters, min_price: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Max"
            className="w-full border p-2 rounded"
            onChange={(e) =>
              setFilters({ ...filters, max_price: e.target.value })
            }
          />
        </div>

        {/* SORT */}
        <div>
          <h3 className="font-semibold mb-2">Sort By</h3>
          <select
            className="w-full border p-2 rounded"
            onChange={(e) =>
              setFilters({ ...filters, orderby: e.target.value })
            }
          >
            <option value="">Default</option>
            <option value="date">Latest</option>
            <option value="price">Price</option>
            <option value="popularity">Popularity</option>
          </select>
        </div>
      </aside>

      {/* PRODUCTS */}
      <section className="flex-1">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {products.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-white shadow rounded-xl"
              >
                <img
                  src={p.images?.[0]?.src}
                  alt={p.name}
                  className="rounded-xl mb-3"
                />
                <h2 className="font-semibold">{p.name}</h2>
                <p
                  className="text-gray-600"
                  dangerouslySetInnerHTML={{ __html: p.price_html }}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </div>
  );
}
