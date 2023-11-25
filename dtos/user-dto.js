const createUserDto= (model) => {
  return {
    id: model._id,
    email: model.email,
    verify: model.verify,
  };
};

export default createUserDto;
