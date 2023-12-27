const apiUrl = 'https://crudcrud.com/api/41788e48a52f427ba77d32f4eea9ee85/products';

async function addProduct() {
  const productName = document.getElementById('productName').value;
  const sellingPrice = document.getElementById('sellingPrice').value;

  
  if (!productName || !sellingPrice) {
    alert('Please enter both product name and selling price.');
    return;
  }

 
  const newProduct = {
    productName,
    sellingPrice: parseFloat(sellingPrice),
  };

  try {
    
    await axios.post(apiUrl, newProduct);
   
    displayProducts();
  } catch (error) {
    console.error('Error adding product:', error);
  }
}

async function displayProducts() {
  try {
    
    const response = await axios.get(apiUrl);
    const productList = document.getElementById('productList');
    productList.innerHTML = ''; 

    let totalValue = 0; 

   
    response.data.forEach(product => {
      const listItem = document.createElement('li');
      listItem.textContent = `${product.productName} - $${product.sellingPrice.toFixed(2)}`;

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.onclick = () => deleteProduct(product._id);

      listItem.appendChild(deleteButton);
      productList.appendChild(listItem);

      
      totalValue += product.sellingPrice;
    });

   
    const totalElement = document.createElement('div');
    totalElement.innerHTML = `<strong>Total Value:</strong> $${totalValue.toFixed(2)}`;
    productList.appendChild(totalElement);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

async function deleteProduct(productId) {
  try {
   
    await axios.delete(`${apiUrl}/${productId}`);
    
    displayProducts();
  } catch (error) {
    console.error('Error deleting product:', error);
  }
}


displayProducts();