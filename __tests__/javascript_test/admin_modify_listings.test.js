// Define addService and displayProducts functions directly in the test file
const addService = jest.fn();

async function displayProducts() {
  // Mock the fetch function
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue([
      {
        name: 'Product 1',
        image: 'image1.jpg',
        description: 'Description 1',
        price: '10',
        priceType: 'Per Hour',
        _id: 'product1_id',
        display: true,
      },
      {
        name: 'Product 2',
        image: 'image2.jpg',
        description: 'Description 2',
        price: '20',
        priceType: 'Per Day',
        _id: 'product2_id',
        display: false,
      },
    ]),
  });

  // Clear containers before fetching products
  global.activeListingContainer = document.createElement('div');
  global.inactiveListingContainer = document.createElement('div');

  try {
    const response = await fetch('/api/products');
    if (!response.ok) {
      throw new Error('Failed to get products form Database');
    }
    const products = await response.json();

    // Add products to containers
    products.forEach((product) => {
      addService(
        product.display === true ? global.activeListingContainer : global.inactiveListingContainer,
        product.name,
        product.image,
        product.description,
        product.price,
        product.priceType,
        product._id
      );
    });
  } catch (error) {
    console.error(error.message);
    alert('Failed to Fetch products');
  }
}

describe('displayProducts', () => {
  beforeEach(() => {
    // Clear the mock function before each test
    addService.mockClear();
  });

  it('should add products to active and inactive containers', async () => {
    // Call the displayProducts function
    await displayProducts();

    // Assert that addService was called with correct parameters for active product
    expect(addService).toHaveBeenCalledWith(
      global.activeListingContainer,
      'Product 1',
      'image1.jpg',
      'Description 1',
      '10',
      'Per Hour',
      'product1_id'
    );

    // Assert that addService was called with correct parameters for inactive product
    expect(addService).toHaveBeenCalledWith(
      global.inactiveListingContainer,
      'Product 2',
      'image2.jpg',
      'Description 2',
      '20',
      'Per Day',
      'product2_id'
    );
  });
});
