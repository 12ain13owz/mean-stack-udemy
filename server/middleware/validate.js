const validate = (schema, req, res) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    return null;
  } catch (error) {
    const e = [];
    for (error of error.errors) e.push(error.message);
    console.log(`validate:\n${e.join("\n")}`);

    return error;
  }
};

module.exports = validate;
