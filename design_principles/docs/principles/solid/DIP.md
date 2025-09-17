# Dependency Inversion Principle (DIP)

#### What: 
- One of the SOLID principles of object-oriented design.
- Aims to reduce the coupling between high-level and low-level modules.
- Encourages the use of interfaces or abstract classes to decouple code.
- Depend on interfaces, not implementations.

#### Why is it important?
- 	Makes your code flexible — you can swap implementations without changing higher-level code.
- 	Makes your code testable — you can mock interfaces easily.
- 	Reduces coupling — business logic doesn’t break when you change infrastructure details.

### Example:

// bad example
```csharp

// Can not easily swap payment methods or mock for testing
public class OrderService
{
    private readonly CreditCardPayment _payment = new CreditCardPayment(); // tightly coupled   

    public void ProcessOrder(decimal amount)
    {
        _payment.Charge(amount); // tightly coupled
    }
}

```

// good example
```csharp
public interface IPaymentMethod
{
    void Charge(decimal amount);
}

public class CreditCardPayment : IPaymentMethod
{
    public void Charge(decimal amount)
        => Console.WriteLine($"Charged {amount} with Credit Card.");
}

public class OrderService
{
    private readonly IPaymentMethod _payment;

    public OrderService(IPaymentMethod payment)
    {
        _payment = payment; // injected
    }

    public void ProcessOrder(decimal amount)
    {
        _payment.Charge(amount); // depends on abstraction
    }
}
```

## Benefits

- Reduces coupling between modules.
- Makes code easier to extend and refactor.
- Facilitates unit testing.