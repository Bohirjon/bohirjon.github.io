# Liskov Substitution Principle (LSP)

The Liskov Substitution Principle is one of the SOLID principles of object-oriented design. It states:

> **Objects of a superclass should be replaceable with objects of a subclass without affecting the correctness of the program.**

## Key Points

- Subclasses must honor the contracts of their base classes.
- Derived classes should not override base class behavior in a way that breaks client expectations.
- Violations often occur when a subclass changes the meaning of inherited methods.

## Example

```csharp
// Bad Example
public interface IPaymentMethod
{
    string Name { get; }
    void Charge(decimal amount);
    void Refund(decimal amount);
}

public class CreditCardPayment : IPaymentMethod
{
    public string Name => "CreditCard";

    public void Charge(decimal amount) 
        => Console.WriteLine($"Charged {amount} with Credit Card.");

    public void Refund(decimal amount) 
        => Console.WriteLine($"Refunded {amount} to Credit Card.");
}

public class GiftCardPayment : IPaymentMethod
{
    public string Name => "GiftCard";

    public void Charge(decimal amount) 
        => Console.WriteLine($"Charged {amount} from Gift Card.");

    // 🚨 Violation: Gift cards don’t support refunds!
    public void Refund(decimal amount) 
        => throw new NotSupportedException("Gift cards cannot be refunded!");
}
```

// Good Example
```csharp
public interface IPaymentMethod
{
    string Name { get; }
    void Charge(decimal amount);
}

public interface IRefundablePaymentMethod : IPaymentMethod
{
    void Refund(decimal amount);
}

public class CreditCardPayment : IRefundablePaymentMethod
{
    public string Name => "CreditCard";

    public void Charge(decimal amount) 
        => Console.WriteLine($"Charged {amount} with Credit Card.");

    public void Refund(decimal amount) 
        => Console.WriteLine($"Refunded {amount} to Credit Card.");
}

public class GiftCardPayment : IPaymentMethod
{
    public string Name => "GiftCard";

    public void Charge(decimal amount) 
        => Console.WriteLine($"Charged {amount} from Gift Card.");
}
```

In this example, the `GiftCardPayment` class no longer violates LSP because it does not implement the `Refund` method, which it cannot support.

## How to Apply

- Ensure subclasses extend functionality, not replace or restrict it.
- Use interfaces or composition if subclassing would break LSP.

## References

- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)
- [Liskov Substitution Principle](https://en.wikipedia.org/wiki/Liskov_substitution_principle)