const register = async (req,res) => {
    res.send('resgister user')
}

const login = async (req, res) => {
  res.send("login user");
};

const logout = async (req, res) => {
  res.send("logout user");
};


module.exports = {
    register,
    login,
    logout
}