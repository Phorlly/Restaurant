//All libraries to be loaded
const { app, port } = require(".");
const { foodRoutes } = require("./routes/foods");
const { dbContext } = require("./configures/datastore");
const { orderRoutes, adminOrderRoutes } = require("./routes/orders");
const {
  restaurantRoutes,
  adminRestaurantRoutes,
} = require("./routes/restaurants");
const { userRoutes } = require("./routes/users");
const { cartRoutes, itemRoutes } = require("./routes/carts");
const { categoryRoutes, adminCategoryRoutes } = require("./routes/categories");
const { eventRoutes } = require("./routes/events");
const { ingredientRoutes } = require("./routes/ingredients");

// Routes
app.use("/api/users", userRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/admin/restaurants", adminRestaurantRoutes);
app.use("/api/oders", orderRoutes);
app.use("/api/admin/oders", adminOrderRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/admin/categories", adminCategoryRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/ingredients", ingredientRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Sever is running on http://localhost:${port}`);
  dbContext();
});
