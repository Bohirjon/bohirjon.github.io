#### What: YANGI (You Aren't Gonna Need It)
 - Don’t add functionality until it is necessary.
 - Focus on current requirements rather than speculative future needs.

#### Why: 
- Reduces complexity and keeps the codebase manageable.
- Prevents wasted effort on features that may never be used.

#### How: 

```csharp
// Bad Example: Adding unnecessary features
public interface ICustomerRepository
{
    Customer GetById(int id);
    IEnumerable<Customer> GetAll();
    IEnumerable<Customer> GetByCity(string city);   // Not needed
    IEnumerable<Customer> GetByAge(int age);       // Not needed
    IEnumerable<Customer> GetByCountry(string country); // Not needed
}

public class OrderService
{
    public void ProcessOrder(decimal amount, string couponCode = null, int loyaltyPoints = 0)
    {
        if (!string.IsNullOrEmpty(couponCode))
        {
            // Not even needed yet!
            ApplyCoupon(couponCode);
        }

        if (loyaltyPoints > 0)
        {
            // Future feature, unused today!
            ApplyLoyaltyPoints(loyaltyPoints);
        }

        Console.WriteLine($"Order processed for {amount}");
    }

    private void ApplyCoupon(string couponCode) { }
    private void ApplyLoyaltyPoints(int points) { }
}

```

```csharp
// Good Example: Focused on current requirements
public interface ICustomerRepository
{
    Customer GetById(int id);
    IEnumerable<Customer> GetAll();
}

public class OrderService
{
    public void ProcessOrder(decimal amount)
    {
        Console.WriteLine($"Order processed for {amount}");
    }
}

```
