module.exports.hello = {
  handler: (request, reply) => reply({ message: 'Hello API ROOT!' }),
};

module.exports.notFound = {
  handler: (request, reply) => reply({ message: 'Oops, 404 Page!' }).code(404),
};
